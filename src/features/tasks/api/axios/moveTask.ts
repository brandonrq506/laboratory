import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import { ScheduledTaskWithExpectedStartTime } from "../../types/scheduledTaskWithExpectedStartTime";

type Props = {
  taskId: number;
  newPosition: number;
  // This is not used, it is just for optimistic UI update.
  tasks: ScheduledTaskWithExpectedStartTime[];
};

const URL = `${TASKS_ENDPOINT}/move_drag`;

export const moveTask = async ({ taskId, newPosition }: Props) => {
  const response = await apiV1.patch(URL, {
    new_position: newPosition,
    task_id: taskId,
  });
  return response.data;
};
