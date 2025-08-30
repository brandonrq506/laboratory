import { ACTIVITIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "../../types/activityAPI";
import { PostActivity } from "../../types/postActivity";

export const createActivity = async (activity: PostActivity) => {
  const response = await apiV1.post<ActivityAPI>(ACTIVITIES_ENDPOINT, activity);
  return response.data;
};
