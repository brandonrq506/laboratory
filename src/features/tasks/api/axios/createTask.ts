import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { TaskAPI } from "../../types/task";
import { TaskModel } from "../../types/taskModel";

// This type ensures all fields in TaskModel are optional except for activity_id, which is required.
type CreateTaskInput = Partial<TaskModel> & Pick<TaskModel, "activity_id">;

export const createTask = async (task: CreateTaskInput) => {
  const response = await apiV1.post<TaskAPI>(TASKS_ENDPOINT, task);
  return response.data;
};
