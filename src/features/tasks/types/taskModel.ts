import { TaskStatus } from "./task-status";

export type TaskModel = {
  id: number;
  end_time: string | null;
  optional_name: string | null;
  start_time: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
  activity_id: number;
  user_id: number;
};
