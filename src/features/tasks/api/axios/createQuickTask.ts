import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { TaskAPI } from "../../types/task";

export const createQuickTask = async (activity: ActivityAPI) => {
  const response = await apiV1.post<TaskAPI>(TASKS_ENDPOINT, {
    activity_id: activity.id,
  });
  return response.data;
};
