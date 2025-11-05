import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import type { ScheduledTaskAPI } from "../types/scheduledTask";

let tempIdCounter = -1;

export const buildTemporaryScheduledTask = (
  activity: ActivityWithCategory,
): ScheduledTaskAPI => {
  const now = new Date().toISOString();

  return {
    id: tempIdCounter--,
    activity,
    status: "scheduled",
    // position will be normalized later
    position: "TEMP",
    start_time: null,
    end_time: null,
    note: "",
    optional_name: null,
    created_at: now,
    updated_at: now,
  };
};
