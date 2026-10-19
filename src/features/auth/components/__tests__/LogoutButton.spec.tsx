import { act, render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { LogoutButton } from "../LogoutButton";
import { createDeferred } from "@/test/utils/create-deferred";

const { mutateAsync } = vi.hoisted(() => ({ mutateAsync: vi.fn() }));

vi.mock("@/features/auth/api/tanstack/useLogout", () => ({
  useLogout: () => ({ mutateAsync }),
}));

describe("LogoutButton", () => {
  afterEach(() => vi.restoreAllMocks());

  it("invalidates route data and navigates to login after logout completes", async () => {
    const user = userEvent.setup();
    const logout = createDeferred<void>();
    mutateAsync.mockReturnValue(logout.promise);

    const rootRoute = createRootRoute();
    const loader = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
    const protectedRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/activities",
      loader,
      component: LogoutButton,
    });
    const loginRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/login",
      component: () => <h1>Login</h1>,
    });
    const router = createRouter({
      routeTree: rootRoute.addChildren([protectedRoute, loginRoute]),
      history: createMemoryHistory({ initialEntries: ["/activities"] }),
      defaultPendingMinMs: 0,
    });
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    await router.load();
    render(<RouterProvider router={router} />);
    const button = await screen.findByRole("button", {
      name: /logout button/i,
    });
    const invalidate = vi.spyOn(router, "invalidate");

    await user.click(button);

    expect(mutateAsync).toHaveBeenCalledTimes(1);
    expect(invalidate).not.toHaveBeenCalled();
    expect(router.state.location.pathname).toBe("/activities");

    await act(async () => {
      logout.resolve();
      await logout.promise;
    });

    await waitFor(() => expect(invalidate).toHaveBeenCalledTimes(1));
    expect(loader).toHaveBeenCalledTimes(2);
    expect(
      await screen.findByRole("heading", { name: "Login" }),
    ).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/login");
  });
});
