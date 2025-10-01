import type { ActivityAPI } from "@/features/activities/types/activityAPI";
import type { RoutineActivity } from "../types/routineActivity";

let tempRoutineActivityIdCounter = -1;

export const buildTemporaryRoutineActivity = (
  activity: ActivityAPI,
  position: number,
): RoutineActivity => ({
  id: tempRoutineActivityIdCounter--,
  activity_id: activity.id,
  activity_name: activity.display_name,
  activity_exp_seconds: activity.exp_seconds,
  category_name: activity.category.name,
  category_color: activity.category.color,
  position,
});
