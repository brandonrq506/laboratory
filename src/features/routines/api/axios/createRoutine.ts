import type { RoutineWithItems } from "../../types/routine-with-items";

import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { RoutineForm } from "../../types/routineForm";

export const createRoutine = async (routine: RoutineForm) => {
  const response = await apiV1.post<RoutineWithItems>(
    ROUTINES_ENDPOINT,
    routine,
  );
  return response.data;
};
