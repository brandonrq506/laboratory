import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { TaskAPI } from "../../types/task";

type Props = {
  task: Partial<TaskAPI>;
  taskId: number;
};

export const updateTask = async ({ taskId, task }: Props) => {
  const URL = `${TASKS_ENDPOINT}/${taskId}`;

  const { data } = await apiV1.patch<TaskAPI>(URL, task);
  return data;
};
