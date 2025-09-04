import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { CompletedTaskAPI } from "../types/completedTask";
import { roundToNearestMinutes } from "date-fns";

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
    start_time: roundToNearestMinutes(start).toISOString(),
    end_time: roundToNearestMinutes(end).toISOString(),
    note,
    optional_name: null,
    created_at: now,
    updated_at: now,
  };
};
