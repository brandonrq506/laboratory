import { useQueryClient } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { getRoutine } from "../axios/getRoutine";

import { MINUTE } from "@/utils/time";

export const usePrefetchRoutine = () => {
  const queryClient = useQueryClient();

  const prefetch = (routineId: number) => {
    queryClient.prefetchQuery({
      queryKey: [ROUTINES_ENDPOINT, routineId],
      queryFn: ({ signal }) => getRoutine({ routineId, signal }),
      staleTime: MINUTE,
    });
  };

  return prefetch;
};
