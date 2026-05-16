import { TASKS_ENDPOINT, apiV1 } from "@/libs/axios";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

interface Props {
  task_ids: number[];
  previous_task_id: number | null;
  next_task_id: number | null;
  // This is not used, it is just for optimistic UI update.
  tasks: ScheduledTaskAPI[];
}

const URL = `${TASKS_ENDPOINT}/span_moves`;

export const moveTasks = async ({
  task_ids,
  previous_task_id,
  next_task_id,
}: Props) => {
  await apiV1.post(URL, {
    task_ids,
    previous_task_id,
    next_task_id,
  });
};
