import { ACTIVITIES_ENDPOINT, ROUTINES_ENDPOINT, apiV1 } from "@/libs/axios";

interface Props {
  activityId: number;
  routineId: number;
}

export const createActivityRoutine = async ({
  activityId,
  routineId,
}: Props) => {
  const URL = `${ROUTINES_ENDPOINT}/${routineId}${ACTIVITIES_ENDPOINT}`;
  const response = await apiV1.post(URL, { activity_id: activityId });

  return response.data;
};
