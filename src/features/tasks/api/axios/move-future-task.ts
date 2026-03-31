import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import type { ScheduledTaskAPI } from "../../types/scheduledTask";

type Props = {
  taskId: number;
  prevTaskId: number | null;
  nextTaskId: number | null;
  // This is not used, it is just for optimistic UI update.
  tasks: ScheduledTaskAPI[];
};

const URL = `${TASKS_ENDPOINT}/move_drag`;

export const moveFutureTask = async ({
  taskId,
  prevTaskId,
  nextTaskId,
}: Props) => {
  const response = await apiV1.patch(URL, {
    task_id: taskId,
    previous_task_id: prevTaskId,
    next_task_id: nextTaskId,
  });
  return response.data;
};
