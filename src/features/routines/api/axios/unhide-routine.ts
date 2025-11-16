import type { RoutineWithItems } from "../../types/routine-with-items";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

export const unhideRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/unhide`;
  const response = await apiV1.patch<RoutineWithItems>(URL);
  return response.data;
};
