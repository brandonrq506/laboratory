import "./index.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "@/libs/auth-interceptors";
import { AuthProvider, useAuth } from "./features/auth/stores";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/tanstack-query/query-client";

// Create a new router instance
const TanStackQueryProviderContext = { queryClient };

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  /*
    Scroll behavior. Standard pages reset to the top: the default per-entry scroll key
    makes every forward navigation a cache miss, so the window scrolls to top even on
    revisit. Modal pages, rendered over an index page's <Outlet/>, keep scroll — returning
    false leaves scroll untouched on open, and closing the modal (history back) restores it.
  */
  // eslint-disable-next-line no-use-before-define
  scrollRestoration: ({ location }) => !isModalLocation(location.pathname),
  context: {
    ...TanStackQueryProviderContext,
    auth: undefined!,
  },
});

// True when the matched route chain is flagged `staticData: { modal: true }`.
function isModalLocation(pathname: string): boolean {
  return router
    .getMatchedRoutes(pathname)
    .matchedRoutes.some((route) => route.options.staticData?.modal === true);
}

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
  // Lets modal routes declare `staticData: { modal: true }` to opt out of scroll reset.
  interface StaticDataRouteOption {
    modal?: boolean;
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
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
