import { ACTIVITIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { ActivityPatchPayload } from "../../types/activity-patch-payload";
import type { ActivityWithCategory } from "../../types/activity-with-category";

type Props = {
  activity: ActivityPatchPayload;
  activityId: number;
};

export const updateActivity = async ({ activityId, activity }: Props) => {
  const URL = `${ACTIVITIES_ENDPOINT}/${activityId}`;

  const response = await apiV1.patch<ActivityWithCategory>(URL, activity);
  return response.data;
};
