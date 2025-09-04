import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { CompletedTaskAPI } from "../types/completedTask";

let tempIdCounter = -1;

export const buildTemporaryCompletedTask = (
  activity: ActivityAPI,
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
    start_time: start,
    end_time: end,
    note,
    optional_name: null,
    created_at: now,
    updated_at: now,
  };
};
