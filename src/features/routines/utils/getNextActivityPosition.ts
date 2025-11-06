import type { RoutineWithActivities } from "../types/routine-with-activities";

export const getNextActivityPosition = (
  activities: RoutineWithActivities["activities"] | undefined,
): number => {
  if (!activities?.length) return 1;
  return Math.max(...activities.map((activity) => activity.position)) + 1;
};
