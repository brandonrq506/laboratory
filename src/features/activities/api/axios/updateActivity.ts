import { ACTIVITIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { PostActivity } from "../../types/postActivity";

type Props = {
  activity: Partial<PostActivity>;
  activityId: number;
};

export const updateActivity = async ({ activityId, activity }: Props) => {
  const URL = `${USERS_ENDPOINT}/1${ACTIVITIES_ENDPOINT}/${activityId}`;

  const response = await apiV1.patch(URL, activity);
  return response.data;
};