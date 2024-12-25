import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { InProgressTaskAPI } from "../../types/inProgressTast";

export const startTask = async (taskId: number) => {
  const URL = `${USERS_ENDPOINT}/1${TASKS_ENDPOINT}/${taskId}/start`;
  const { data } = await apiV1.post<InProgressTaskAPI>(URL);
  return data;
};
