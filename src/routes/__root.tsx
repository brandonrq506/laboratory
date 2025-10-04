import { createRootRouteWithContext } from "@tanstack/react-router";

import { MainLayout } from "@/components/layout";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackQueryDevtools } from "@/libs/tanstack-query/dev-tools";
import { TanStackRouterDevtools } from "@/libs/tanstack-router/dev-tools";

import type { AuthContextType } from "@/features/auth/stores/AuthContextType";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <MainLayout />
      <TanStackDevtools
        plugins={[TanStackRouterDevtools, TanStackQueryDevtools]}
      />
    </>
  ),
});
