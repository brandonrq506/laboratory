import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import type { BaseEntity } from "@/types/core";
import type { TaskStatus } from "./task-status";

export interface BaseTaskAPI extends BaseEntity {
  activity: ActivityWithCategory;
  note: string;
  optional_name: string | null;
  status: TaskStatus;
  position: string | null;
}
