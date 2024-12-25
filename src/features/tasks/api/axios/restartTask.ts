import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ScheduledTaskAPI } from "../../types/scheduledTask";

export const restartTask = async (taskId: number) => {
  const URL = `${USERS_ENDPOINT}/1${TASKS_ENDPOINT}/${taskId}/restart`;
  const { data } = await apiV1.post<ScheduledTaskAPI>(URL);
  return data;
};
