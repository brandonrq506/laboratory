import { useQueryClient } from "@tanstack/react-query";

import { routineByIdQueryOptions } from "../queries";

export const usePrefetchRoutine = () => {
  const queryClient = useQueryClient();

  const prefetch = (routineId: number) => {
    queryClient.prefetchQuery(routineByIdQueryOptions(routineId));
  };

  return prefetch;
};
