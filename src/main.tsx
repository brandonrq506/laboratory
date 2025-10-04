import "./index.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import { AuthProvider, useAuth } from "./features/auth/stores";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/tanstack-query/query-client";

// Create a new router instance
const TanStackQueryProviderContext = { queryClient };

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  context: {
    ...TanStackQueryProviderContext,
    auth: undefined!,
  },
});

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
