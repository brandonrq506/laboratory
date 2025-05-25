import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { TaskAPI } from "../../types/task";
import { TaskModel } from "../../types/taskModel";

export const createTask = async (task: Partial<TaskModel>) => {
  const { data } = await apiV1.post<TaskAPI>(TASKS_ENDPOINT, task);
  return data;
};
