import type { QueryClient, QueryKey } from "@tanstack/react-query";

export const invalidateQueries = (
  queryClient: QueryClient,
  ...queryKeys: { queryKey: QueryKey }[]
) => {
  queryKeys.forEach((key) => {
    queryClient.invalidateQueries(key);
  });
};
