import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteTask = async (taskId: number) => {
  const URL = `${USERS_ENDPOINT}/1${TASKS_ENDPOINT}/${taskId}`;
  await apiV1.delete(URL);
};
