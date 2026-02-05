import "./index.css";

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";

import { useAuth } from "@clerk/clerk-react";
import { useClerkAuth } from "./features/auth/clerk/use-clerk-auth";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ClerkWrapper } from "./features/auth/clerk";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/tanstack-query/query-client";

import { routeTree } from "./routeTree.gen";
import { setupAuthInterceptor } from "./libs/axios";

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

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useClerkAuth();
  const { getToken } = useAuth();

  if (auth.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  setupAuthInterceptor(getToken);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}

export function App() {
  return (
    <ClerkWrapper>
      <InnerApp />
    </ClerkWrapper>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
