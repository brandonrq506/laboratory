import { useQueryClient } from "@tanstack/react-query";

import { taskByIdQueryOptions } from "../queries";

export const usePrefetchTask = () => {
  const queryClient = useQueryClient();

  const prefetch = (taskId: number) => {
    queryClient.prefetchQuery(taskByIdQueryOptions(taskId));
  };

  return prefetch;
};
