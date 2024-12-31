import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { BaseEntity } from "@/types/core";
import { TaskStatus } from "./taskStatus";

export interface BaseTaskAPI extends BaseEntity {
  activity: ActivityAPI;
  optional_name: string | null;
  status: TaskStatus;
  user_id: number;
}