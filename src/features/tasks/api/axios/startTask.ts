import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { InProgressTaskAPI } from "../../types/inProgressTast";

export const startTask = async (task: InProgressTaskAPI) => {
  const URL = `${TASKS_ENDPOINT}/${task.id}`;

  const { data } = await apiV1.patch<InProgressTaskAPI>(URL, task);
  return data;
};
