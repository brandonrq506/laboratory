import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { Fragment } from "react/jsx-runtime";
import { TanStackDevtoolsWrapper } from "@/libs/tanstack-devtools";

import type { AuthContextType } from "@/features/auth/stores/AuthContextType";
import { NotFoundPage } from "@/pages/NotFoundPage";
import type { QueryClient } from "@tanstack/react-query";
import { getPageTitle } from "@/utils";
import { useApplyTheme } from "@/features/userPreferences/hooks";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContextType;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({ meta: [{ title: getPageTitle("Laboratory") }] }),
  component: RootComponent,
  notFoundComponent: () => <NotFoundPage />,
  errorComponent: ({ error }) => (
    <div>
      Route Error: {error instanceof Error ? error.message : String(error)}
    </div>
  ),
});

function RootComponent() {
  useApplyTheme();

  return (
    <Fragment>
      <HeadContent />
      <Outlet />
      <TanStackDevtoolsWrapper />
    </Fragment>
  );
}
