import { ACTIVITIES_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteActivity = async (activityId: number) => {
  const URL = `${ACTIVITIES_ENDPOINT}/${activityId}`;
  await apiV1.delete(URL);
};
