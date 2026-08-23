import { roundToNearestMinutes } from "date-fns";

import type { CompletedTaskAPI } from "../types/completedTask";
import type { InProgressTaskAPI } from "../types/inProgressTask";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

interface Props {
  task: InProgressTaskAPI;
  endTime: string;
}

export const transitionInProgressTaskToCompleted = ({
  task,
  endTime,
}: Props): CompletedTaskAPI => ({
  ...task,
  status: TASK_STATUS.COMPLETED,
  start_time: roundToNearestMinutes(new Date(task.start_time)).toISOString(),
  end_time: roundToNearestMinutes(new Date(endTime)).toISOString(),
});
