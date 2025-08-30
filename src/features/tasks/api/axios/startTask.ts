import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { InProgressTaskAPI } from "../../types/inProgressTask";

export const startTask = async (task: InProgressTaskAPI) => {
  const URL = `${TASKS_ENDPOINT}/${task.id}`;

  const response = await apiV1.patch<InProgressTaskAPI>(URL, task);
  return response.data;
};
