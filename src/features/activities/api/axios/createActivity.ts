import { ACTIVITIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { ActivityPostPayload } from "../../types/activity-post-payload";
import type { ActivityWithCategory } from "../../types/activity-with-category";

export const createActivity = async (activity: ActivityPostPayload) => {
  const response = await apiV1.post<ActivityWithCategory>(
    ACTIVITIES_ENDPOINT,
    activity,
  );
  return response.data;
};
