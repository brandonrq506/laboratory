import { ACTIVITIES_ENDPOINT, ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

interface Props {
  itemId: number;
  routineId: number;
}

export const deleteRoutineItem = async ({ itemId, routineId }: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}${ACTIVITIES_ENDPOINT}/${itemId}`;
  await apiV1.delete(URL);
};
