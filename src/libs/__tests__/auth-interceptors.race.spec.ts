import { HttpResponse, http } from "msw";
import { REFRESH_ENDPOINT, apiV1 } from "@/libs/axios";
import { resetInterceptors, setAccessToken } from "@/libs/auth-interceptors";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = `${API_URL}/v1`;

beforeEach(() => {
  resetInterceptors();
});

describe("auth-interceptors — refresh/rotation race", () => {
  it("triggers only a single refresh for concurrent 401s", async () => {
    const refreshSpy = vi.fn();
    let protectedCalls = 0;
    server.use(
      http.get(`${BASE}/protected`, () => {
        protectedCalls++;
        if (protectedCalls <= 3) {
          return HttpResponse.json(null, { status: 401 });
        }
        return HttpResponse.json({ ok: true });
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, async () => {
        refreshSpy();
        await new Promise((r) => setTimeout(r, 30));
        return HttpResponse.json({ access_token: "fresh-token" });
      }),
    );

    const results = await Promise.all([
      apiV1.get("/protected"),
      apiV1.get("/protected"),
      apiV1.get("/protected"),
    ]);

    results.forEach((res) => expect(res.data).toEqual({ ok: true }));
    expect(refreshSpy).toHaveBeenCalledOnce();
  });

  it("retries a straggler with the latest token without a second refresh", async () => {
    const refreshSpy = vi.fn();
    setAccessToken("stale-token");

    let calls = 0;
    server.use(
      http.get(`${BASE}/straggler`, ({ request }) => {
        calls++;
        if (calls === 1) {
          /* Simulate a concurrent refresh having already rotated the token
             while this request was in flight. */
          setAccessToken("rotated-token");
          return HttpResponse.json(null, { status: 401 });
        }
        return HttpResponse.json({
          auth: request.headers.get("Authorization"),
        });
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, () => {
        refreshSpy();
        return HttpResponse.json({ access_token: "should-not-be-used" });
      }),
    );

    const res = await apiV1.get("/straggler");
    expect(res.data.auth).toBe("Bearer rotated-token");
    expect(refreshSpy).not.toHaveBeenCalled();
    expect(calls).toBe(2);
  });
});
