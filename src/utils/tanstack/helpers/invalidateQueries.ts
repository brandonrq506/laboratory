import type { QueryClient, QueryKey } from "@tanstack/react-query";

export const invalidateQueries = (
  queryClient: QueryClient,
  ...queryKeys: { queryKey: QueryKey }[]
) => Promise.all(queryKeys.map((key) => queryClient.invalidateQueries(key)));
