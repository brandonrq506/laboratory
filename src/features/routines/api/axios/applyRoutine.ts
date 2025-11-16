import type { RoutineWithItems } from "../../types/routine-with-items";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

export const applyRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/apply`;
  const response = await apiV1.post<RoutineWithItems>(URL);
  return response.data;
};
