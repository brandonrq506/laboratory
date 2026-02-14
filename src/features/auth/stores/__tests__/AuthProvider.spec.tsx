import { HttpResponse, http } from "msw";
import { REFRESH_ENDPOINT, apiV1 } from "@/libs/axios";
import { initInterceptors, resetInterceptors } from "@/libs/auth-interceptors";
import { render, screen, waitFor } from "@/test/test-utils";
import { AuthProvider } from "../AuthProvider";
import { StrictMode } from "react";
import { server } from "@/test/server";
import { useAuth } from "../useAuth";
import userEvent from "@testing-library/user-event";

const API_URL = import.meta.env.VITE_API_URL;
const REFRESH_URL = `${API_URL}/v1${REFRESH_ENDPOINT}`;
const PROTECTED_URL = `${API_URL}/v1/protected`;

const AuthState = () => {
  const { isAuth, logout } = useAuth();

  return (
    <div>
      <div>{isAuth ? "authenticated" : "guest"}</div>
      <button type="button" onClick={() => logout()}>
        Logout
      </button>
      <button
        type="button"
        onClick={() => {
          void apiV1.get("/protected").catch(() => {});
        }}>
        Trigger Protected Request
      </button>
    </div>
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    resetInterceptors();
    initInterceptors();
  });

  afterEach(() => {
    resetInterceptors();
  });

  it("deduplicates bootstrap refresh under StrictMode", async () => {
    const refreshSpy = vi.fn();

    server.use(
      http.post(REFRESH_URL, () => {
        refreshSpy();
        return HttpResponse.json({ access_token: "bootstrap-token" });
      }),
    );

    render(
      <StrictMode>
        <AuthProvider>
          <AuthState />
        </AuthProvider>
      </StrictMode>,
    );

    expect(await screen.findByText("authenticated")).toBeInTheDocument();
    expect(refreshSpy).toHaveBeenCalledTimes(1);
  });

  it("calls onAuthLost for manual and refresh-failed paths", async () => {
    const onAuthLost = vi.fn();
    let refreshCallCount = 0;

    server.use(
      http.post(REFRESH_URL, () => {
        refreshCallCount += 1;

        if (refreshCallCount === 1) {
          return HttpResponse.json({ access_token: "bootstrap-token" });
        }

        return HttpResponse.json(
          { error: "Invalid refresh token" },
          { status: 401 },
        );
      }),
      http.get(PROTECTED_URL, () => HttpResponse.json(null, { status: 401 })),
    );

    const user = userEvent.setup();

    render(
      <AuthProvider onAuthLost={onAuthLost}>
        <AuthState />
      </AuthProvider>,
    );

    expect(await screen.findByText("authenticated")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Logout" }));

    await waitFor(() => {
      expect(onAuthLost).toHaveBeenCalledWith("manual");
    });

    await user.click(
      screen.getByRole("button", { name: "Trigger Protected Request" }),
    );

    await waitFor(() => {
      expect(onAuthLost).toHaveBeenCalledWith("refresh-failed");
    });
  });
});
