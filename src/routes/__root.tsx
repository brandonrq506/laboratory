import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { Fragment } from "react/jsx-runtime";
import { TanStackDevtoolsWrapper } from "@/libs/tanstack-devtools";

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
      <TanStackDevtoolsWrapper />
    </Fragment>
  ),
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ error }) => <div>Route Error: {error.message}</div>,
});
