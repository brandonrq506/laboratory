import type { RoutineWithItems } from "../../types/routine-with-items";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

export const hideRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/hide`;
  const response = await apiV1.patch<RoutineWithItems>(URL);
  return response.data;
};
