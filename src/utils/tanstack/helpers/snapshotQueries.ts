import type { QueryClient, QueryKey } from "@tanstack/react-query";

export interface CacheSnapshotEntry<T> {
  queryKey: QueryKey;
  value: T | undefined;
}

export interface CacheSnapshot {
  entries: CacheSnapshotEntry<unknown>[];
  rollback: () => void;
}

type SnapshotQueriesFn = (
  queryClient: QueryClient,
  queryKeys: QueryKey[],
) => CacheSnapshot;

export const snapshotQueries: SnapshotQueriesFn = (queryClient, queryKeys) => {
  const entries = queryKeys.map((queryKey) => ({
    queryKey,
    value: queryClient.getQueryData(queryKey),
  }));

  const rollback = () => {
    for (const { queryKey, value } of entries) {
      queryClient.setQueryData(queryKey, value);
    }
  };
  return { entries, rollback };
};
