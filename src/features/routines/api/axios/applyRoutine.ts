import type { RoutineWithActivities } from "../../types/routine-with-activities";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

export const applyRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/apply`;
  const response = await apiV1.post<RoutineWithActivities>(URL);
  return response.data;
};
