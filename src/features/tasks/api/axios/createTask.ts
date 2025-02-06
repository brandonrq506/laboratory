import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { PostTask } from "../../types/postTask";
import { TaskAPI } from "../../types/task";

export const createTask = async (task: PostTask) => {
  const { data } = await apiV1.post<TaskAPI>(TASKS_ENDPOINT, task);
  return data;
};
