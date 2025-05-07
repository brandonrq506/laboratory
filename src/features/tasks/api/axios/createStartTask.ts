import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { InProgressTaskAPI } from "../../types/inProgressTast";
import { TaskModel } from "../../types/taskModel";

type Props = Pick<TaskModel, "activity_id" | "start_time" | "status">;

export const createStartTask = async (partialTask: Props) => {
  const URL = `${TASKS_ENDPOINT}/create_and_start`;

  const response = await apiV1.post<InProgressTaskAPI>(URL, {
    ...partialTask,
  });

  return response.data;
};
