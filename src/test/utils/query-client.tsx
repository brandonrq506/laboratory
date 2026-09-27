import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";

export const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

/** Unlike `CommonProviders`, binds a client the spec owns so it can seed and read the cache. */
export const createQueryWrapper = (queryClient: QueryClient) => {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
