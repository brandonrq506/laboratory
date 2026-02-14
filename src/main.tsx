import "./index.css";
import { StrictMode, useCallback } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { AuthProvider, useAuth } from "./features/auth/stores";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { initInterceptors } from "@/libs/auth-interceptors";
import { queryClient } from "./libs/tanstack-query/query-client";
import { resolveRedirectPath } from "./utils/search";

// Create a new router instance
const TanStackQueryProviderContext = { queryClient };

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  context: {
    ...TanStackQueryProviderContext,
    auth: undefined!,
  },
});

initInterceptors();

const LOGIN_PATH = "/login";
const LOGOUT_REDIRECT_FALLBACK_PATH = "/timer";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}

export function App() {
  const handleAuthLost = useCallback(async () => {
    queryClient.clear();
    await router.invalidate();

    const currentHref = router.state.location.href;
    const redirectPath = currentHref.startsWith(LOGIN_PATH)
      ? LOGOUT_REDIRECT_FALLBACK_PATH
      : resolveRedirectPath(currentHref, LOGOUT_REDIRECT_FALLBACK_PATH);

    await router.navigate({
      to: LOGIN_PATH,
      replace: true,
      search: { redirect: redirectPath },
    });
  }, []);

  return (
    <AuthProvider onAuthLost={handleAuthLost}>
      <InnerApp />
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
