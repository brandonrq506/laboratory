import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { Fragment } from "react/jsx-runtime";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackQueryDevtools } from "@/libs/tanstack-query/dev-tools";
import { TanStackRouterDevtools } from "@/libs/tanstack-router/dev-tools";

import type { AuthContextType } from "@/features/auth/stores/AuthContextType";
import { NotFoundPage } from "@/pages/NotFoundPage";
import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <Fragment>
      <Outlet />
      <TanStackDevtools
        plugins={[TanStackRouterDevtools, TanStackQueryDevtools]}
      />
    </Fragment>
  ),
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ error }) => <div>Route Error: {error.message}</div>,
});
