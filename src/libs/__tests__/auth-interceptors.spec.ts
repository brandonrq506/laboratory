import { HttpResponse, http } from "msw";
import { REFRESH_ENDPOINT, SESSION_ENDPOINT, apiV1 } from "@/libs/axios";
import {
  resetInterceptors,
  setAccessToken,
  setLogoutHandler,
} from "@/libs/auth-interceptors";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;
const BASE = `${API_URL}/v1`;

beforeEach(() => {
  resetInterceptors();
});

describe("auth-interceptors", () => {
  it("attaches access token to request headers", async () => {
    server.use(
      http.get(`${BASE}/test`, ({ request }) => {
        const auth = request.headers.get("Authorization");
        return HttpResponse.json({ auth });
      }),
    );

    setAccessToken("test-token");
    const res = await apiV1.get("/test");
    expect(res.data.auth).toBe("Bearer test-token");
  });

  it("does NOT refresh on 401 when _skipAuthRefresh is set", async () => {
    const refreshSpy = vi.fn();
    server.use(
      http.post(`${BASE}${SESSION_ENDPOINT}`, () => {
        return HttpResponse.json(
          { error: "Invalid credentials" },
          { status: 401 },
        );
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, () => {
        refreshSpy();
        return HttpResponse.json({ access_token: "new" });
      }),
    );

    await expect(
      apiV1.post(SESSION_ENDPOINT, {}, { _skipAuthRefresh: true }),
    ).rejects.toThrow();
    expect(refreshSpy).not.toHaveBeenCalled();
  });

  it("attempts refresh on logout 401, calls logoutHandler on failure", async () => {
    const logoutSpy = vi.fn();
    setLogoutHandler(logoutSpy);

    server.use(
      http.delete(`${BASE}${SESSION_ENDPOINT}`, () => {
        return HttpResponse.json(null, { status: 401 });
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, () => {
        return HttpResponse.json(null, { status: 401 });
      }),
    );

    await expect(apiV1.delete(SESSION_ENDPOINT)).rejects.toThrow();
    expect(logoutSpy).toHaveBeenCalledOnce();
  });

  it("attempts refresh on logout 401 and retries on success", async () => {
    let deleteCount = 0;
    server.use(
      http.delete(`${BASE}${SESSION_ENDPOINT}`, () => {
        deleteCount++;
        if (deleteCount === 1) {
          return HttpResponse.json(null, { status: 401 });
        }
        return HttpResponse.json({ ok: true });
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, () => {
        return HttpResponse.json({ access_token: "refreshed-token" });
      }),
    );

    const res = await apiV1.delete(SESSION_ENDPOINT);
    expect(res.data).toEqual({ ok: true });
    expect(deleteCount).toBe(2);
  });

  it("refreshes on 401 from protected endpoint and retries", async () => {
    let callCount = 0;
    server.use(
      http.get(`${BASE}/protected`, () => {
        callCount++;
        if (callCount === 1) {
          return HttpResponse.json(null, { status: 401 });
        }
        return HttpResponse.json({ data: "ok" });
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, () => {
        return HttpResponse.json({ access_token: "refreshed-token" });
      }),
    );

    const res = await apiV1.get("/protected");
    expect(res.data).toEqual({ data: "ok" });
    expect(callCount).toBe(2);
  });

  it("queues concurrent requests during refresh, retries all", async () => {
    let protectedCalls = 0;
    server.use(
      http.get(`${BASE}/protected`, () => {
        protectedCalls++;
        if (protectedCalls <= 2) {
          return HttpResponse.json(null, { status: 401 });
        }
        return HttpResponse.json({ call: protectedCalls });
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, async () => {
        await new Promise((r) => setTimeout(r, 50));
        return HttpResponse.json({ access_token: "queued-token" });
      }),
    );

    const [res1, res2] = await Promise.all([
      apiV1.get("/protected"),
      apiV1.get("/protected"),
    ]);

    expect(res1.data).toBeDefined();
    expect(res2.data).toBeDefined();
  });

  it("calls logoutHandler on refresh failure", async () => {
    const logoutSpy = vi.fn();
    setLogoutHandler(logoutSpy);

    server.use(
      http.get(`${BASE}/protected`, () => {
        return HttpResponse.json(null, { status: 401 });
      }),
      http.post(`${BASE}${REFRESH_ENDPOINT}`, () => {
        return HttpResponse.json(null, { status: 401 });
      }),
    );

    await expect(apiV1.get("/protected")).rejects.toThrow();
    expect(logoutSpy).toHaveBeenCalledOnce();
  });

  it("skips retry when _retry is already set", async () => {
    server.use(
      http.get(`${BASE}/protected`, () => {
        return HttpResponse.json(null, { status: 401 });
      }),
    );

    await expect(apiV1.get("/protected", { _retry: true })).rejects.toThrow();
  });

  it("handles missing error.config gracefully", async () => {
    const original = apiV1.defaults.baseURL;
    apiV1.defaults.baseURL = "http://localhost:0/nonexistent";

    await expect(apiV1.get("/test")).rejects.toThrow();

    apiV1.defaults.baseURL = original;
  });

  it("resetInterceptors clears module state", async () => {
    setAccessToken("token");
    setLogoutHandler(() => {});
    resetInterceptors();

    server.use(
      http.get(`${BASE}/test`, ({ request }) => {
        const auth = request.headers.get("Authorization");
        return HttpResponse.json({ auth });
      }),
    );

    const res = await apiV1.get("/test");
    expect(res.data.auth).toBeNull();
  });
});
