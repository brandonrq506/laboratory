import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Routine } from "../../types/routine";

export const hideRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}/hide`;
  const response = await apiV1.patch<Routine>(URL);
  return response.data;
};
