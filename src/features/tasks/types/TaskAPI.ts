import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { BaseEntity } from "@/types/core";
import { TaskStatus } from "./taskStatus";

export type TaskAPI = BaseEntity & {
  activity: ActivityAPI;
  end_time: string | null;
  optional_name: string | null;
  start_time: string | null;
  status: TaskStatus;
  user_id: number;
};
