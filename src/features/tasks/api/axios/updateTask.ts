import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { TaskAPI } from "../../types/task";
import { TaskModel } from "../../types/taskModel";

type Props = {
  task: Partial<TaskModel>;
  taskId: number;
};

export const updateTask = async ({ taskId, task }: Props) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}`;

  const { data } = await apiV1.patch<TaskAPI>(URL, task);
  return data;
};
