import { TanStackDevtools } from "@tanstack/react-devtools";
import { TanStackQueryDevtools } from "@/libs/tanstack-query/dev-tools";
import { TanStackRouterDevtools } from "@/libs/tanstack-router/dev-tools";

export const TanStackDevtoolsWrapper = () => {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <TanStackDevtools
      plugins={[TanStackRouterDevtools, TanStackQueryDevtools]}
    />
  );
};
