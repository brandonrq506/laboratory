import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { BaseEntity } from "@/types/core";
import { TaskStatus } from "./task-status";

export interface BaseTaskAPI extends BaseEntity {
  activity: ActivityAPI;
  note: string;
  optional_name: string | null;
  status: TaskStatus;
  position: string | null;
}
