import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { TaskAPI } from "../../types/task";

export const createTask = async (activity: ActivityAPI) => {
  const { data } = await apiV1.post<TaskAPI>(TASKS_ENDPOINT, {
    activity_id: activity.id,
  });
  return data;
};
