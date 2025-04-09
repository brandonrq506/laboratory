import { ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteRoutine = async (routineId: number) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}`;
  await apiV1.delete(URL);
};
