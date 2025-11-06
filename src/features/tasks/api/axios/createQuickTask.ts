import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { TaskAPI } from "../../types/task";

import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";

export const createQuickTask = async (activity: ActivityWithCategory) => {
  const response = await apiV1.post<TaskAPI>(TASKS_ENDPOINT, {
    activity_id: activity.id,
  });
  return response.data;
};
