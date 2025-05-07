import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { CompletedTaskAPI } from "../../types/completedTask";

export const completeTask = async (task: CompletedTaskAPI) => {
  const URL = `${TASKS_ENDPOINT}/${task.id}`;

  const { data } = await apiV1.patch<CompletedTaskAPI>(URL, task);
  return data;
};
