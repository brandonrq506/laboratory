import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

import { Fragment } from "react/jsx-runtime";
import { TanStackDevtoolsWrapper } from "@/libs/tanstack-devtools";

import { NotFoundPage } from "@/pages/NotFoundPage";
import type { QueryClient } from "@tanstack/react-query";
import type { useClerkAuth } from "@/features/auth/clerk/use-clerk-auth";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: ReturnType<typeof useClerkAuth>;
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
