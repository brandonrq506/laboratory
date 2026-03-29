import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ScheduledTaskAPI } from "../../types/scheduledTask";

import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import type { InsertMode } from "../../types/insert-mode";

type CreateScheduledTaskInput = {
  activity: ActivityWithCategory;
  insertMode: InsertMode;
};

export const createScheduledTask = async ({
  activity,
  insertMode,
}: CreateScheduledTaskInput) => {
  const response = await apiV1.post<ScheduledTaskAPI>(TASKS_ENDPOINT, {
    activity_id: activity.id,
    insert_mode: insertMode,
  });
  return response.data;
};
