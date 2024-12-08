import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { CompletedTaskAPI } from "../../types/completedTask";

export const completeTask = async (taskId: number) => {
  const URL = `${USERS_ENDPOINT}/1/${TASKS_ENDPOINT}/${taskId}/finish`;
  const { data } = await apiV1.post<CompletedTaskAPI>(URL);
  return data;
};
