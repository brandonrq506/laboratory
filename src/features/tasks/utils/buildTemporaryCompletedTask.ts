import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import { CompletedTaskAPI } from "../types/completedTask";
import { roundToNearestMinutes } from "date-fns";

let tempIdCounter = -1;

export const buildTemporaryCompletedTask = (
  activity: ActivityWithCategory,
  start: string,
  end: string,
  note = "",
): CompletedTaskAPI => {
  const now = new Date().toISOString();

  return {
    id: tempIdCounter--,
    activity,
    status: "completed",
    position: null,
    start_time: roundToNearestMinutes(new Date(start)).toISOString(),
    end_time: roundToNearestMinutes(new Date(end)).toISOString(),
    note,
    optional_name: null,
    created_at: now,
    updated_at: now,
  };
};
