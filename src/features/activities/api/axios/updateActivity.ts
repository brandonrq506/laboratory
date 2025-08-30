import { ACTIVITIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "../../types/activityAPI";
import { PostActivity } from "../../types/postActivity";

type Props = {
  activity: Partial<PostActivity>;
  activityId: number;
};

export const updateActivity = async ({ activityId, activity }: Props) => {
  const URL = `${ACTIVITIES_ENDPOINT}/${activityId}`;

  const response = await apiV1.patch<ActivityAPI>(URL, activity);
  return response.data;
};
