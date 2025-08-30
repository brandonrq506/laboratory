import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Routine } from "../../types/routine";
import { RoutineForm } from "../../types/routineForm";

export const createRoutine = async (routine: RoutineForm) => {
  const response = await apiV1.post<Routine>(ROUTINES_ENDPOINT, routine);
  return response.data;
};
