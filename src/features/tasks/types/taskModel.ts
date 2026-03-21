import { BaseEntity } from "@/types/core";
import { TaskStatus } from "./task-status";

export type TaskModel = BaseEntity & {
  activity_id: number;
  end_time: string | null;
  note: string;
  optional_name: string | null;
  position: number | null;
  scheduled_at: string | null;
  start_time: string;
  status: TaskStatus;
  user_id: number;
};
