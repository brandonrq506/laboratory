import type { ObjectValues } from "@/types/core";

export const TASK_STATUS = {
  SCHEDULED: "scheduled",
  COMPLETED: "completed",
  IN_PROGRESS: "in_progress",
} as const;

export type TaskStatus = ObjectValues<typeof TASK_STATUS>;
