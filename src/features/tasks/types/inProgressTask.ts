import type { BaseTaskAPI } from "./baseTask";

import type { TASK_STATUS } from "@/features/tasks/types/task-status";

export interface InProgressTaskAPI extends BaseTaskAPI {
  status: typeof TASK_STATUS.IN_PROGRESS;
  start_time: string;
  end_time: null;
}
