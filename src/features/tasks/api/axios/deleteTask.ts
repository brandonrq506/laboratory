import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteTask = async (taskId: number) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}`;
  await apiV1.delete(URL);
};
