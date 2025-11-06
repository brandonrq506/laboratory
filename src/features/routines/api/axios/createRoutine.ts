import type { RoutineWithActivities } from "../../types/routine-with-activities";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { RoutineForm } from "../../types/routineForm";

export const createRoutine = async (routine: RoutineForm) => {
  const response = await apiV1.post<RoutineWithActivities>(
    ROUTINES_ENDPOINT,
    routine,
  );
  return response.data;
};
