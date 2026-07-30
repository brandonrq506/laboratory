import type { Option } from "@/types/core";

import type { TASK_STATUS } from "@/features/tasks/types/task-status";

export interface NewTaskForm {
  activity: Option | null;
  end_time: string;
  note: string;
  status: typeof TASK_STATUS.COMPLETED;
  start_time: string;
}
