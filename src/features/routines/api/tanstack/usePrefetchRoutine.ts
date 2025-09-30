import { useQueryClient } from "@tanstack/react-query";

import { getRoutine } from "../axios/getRoutine";
import { routineKeys } from "../queries";

import { millisecondsInMinute } from "date-fns/constants";

export const usePrefetchRoutine = () => {
  const queryClient = useQueryClient();

  const prefetch = (routineId: number) => {
    queryClient.prefetchQuery({
      queryKey: routineKeys.detail(routineId),
      queryFn: getRoutine,
      staleTime: millisecondsInMinute,
    });
  };

  return prefetch;
};
