import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import type { RoutineActivity } from "../types/routine-activity";

let tempRoutineActivityIdCounter = -1;

export const buildTemporaryRoutineActivity = (
  activity: ActivityWithCategory,
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
