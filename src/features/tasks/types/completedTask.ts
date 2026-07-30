import type { BaseTaskAPI } from "./baseTask";

import type { TASK_STATUS } from "@/features/tasks/types/task-status";

export interface CompletedTaskAPI extends BaseTaskAPI {
  status: typeof TASK_STATUS.COMPLETED;
  start_time: string;
  end_time: string;
}
