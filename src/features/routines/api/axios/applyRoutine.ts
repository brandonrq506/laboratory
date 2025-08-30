import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Routine } from "../../types/routine";

export const applyRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/apply`;
  const response = await apiV1.post<Routine>(URL);
  return response.data;
};
