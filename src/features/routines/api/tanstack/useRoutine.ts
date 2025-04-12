import { useQuery } from "@tanstack/react-query";

import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { getRoutine } from "../axios/getRoutine";

export const useRoutine = (routineId: number) => {
  return useQuery({
    queryKey: [ROUTINES_ENDPOINT, routineId],
    queryFn: ({ signal }) => getRoutine({ routineId, signal }),
    enabled: Boolean(routineId),
  });
};
