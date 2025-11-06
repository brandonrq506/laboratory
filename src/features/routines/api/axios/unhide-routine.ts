import type { RoutineWithActivities } from "../../types/routine-with-activities";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

export const unhideRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/unhide`;
  const response = await apiV1.patch<RoutineWithActivities>(URL);
  return response.data;
};
