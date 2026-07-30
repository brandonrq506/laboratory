import type { BaseTaskAPI } from "./baseTask";

import type { TASK_STATUS } from "@/features/tasks/types/task-status";

export interface ScheduledTaskAPI extends BaseTaskAPI {
  status: typeof TASK_STATUS.SCHEDULED;
  start_time: null;
  scheduled_at: string;
  end_time: null;
  position: string;
}
