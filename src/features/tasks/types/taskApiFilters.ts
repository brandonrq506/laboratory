import { TaskStatus } from "./task-status";

export type TaskApiFilters = {
  status: TaskStatus;
  category_id: number;
  created_at: string;
  end_time: string;
  start_time: string;
};
