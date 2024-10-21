import { ACTIVITIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteActivity = async (activityId: number) => {
  const URL = `${USERS_ENDPOINT}/1/${ACTIVITIES_ENDPOINT}/${activityId}`;
  await apiV1.delete(URL);
};
