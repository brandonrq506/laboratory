import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ScheduledTaskAPI } from "../../types/scheduledTask";

import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";

export const createScheduledTask = async (activity: ActivityWithCategory) => {
  const response = await apiV1.post<ScheduledTaskAPI>(TASKS_ENDPOINT, {
    activity_id: activity.id,
  });
  return response.data;
};
