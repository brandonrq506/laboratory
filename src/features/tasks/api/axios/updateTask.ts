import { TASKS_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { TaskAPI } from "../../types/task";

type Props = {
  task: Partial<TaskAPI>;
  taskId: number;
};

export const updateTask = async ({ taskId, task }: Props) => {
  console.log(task);
  const URL = `${USERS_ENDPOINT}/1${TASKS_ENDPOINT}/${taskId}`;

  const { data } = await apiV1.patch<TaskAPI>(URL, task);
  return data;
};
