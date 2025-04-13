import { ACTIVITIES_ENDPOINT, ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

interface Props {
  activityId: number;
  routineId: number;
}

export const deleteActivityRoutine = async ({
  activityId,
  routineId,
}: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}${ACTIVITIES_ENDPOINT}/${activityId}`;
  await apiV1.delete(URL);
};
