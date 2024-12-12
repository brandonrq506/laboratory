import { ACTIVITIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "../../types/activityAPI";

export const getActivity = async (activityId: number) => {
  const URL = `${USERS_ENDPOINT}/1/${ACTIVITIES_ENDPOINT}/${activityId}`;
  const response = await apiV1.get<ActivityAPI>(URL);
  return response.data;
};
