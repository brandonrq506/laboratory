import type { Routine } from "../types/routine";

export const getNextActivityPosition = (
  activities: Routine["activities"] | undefined,
): number => {
  if (!activities?.length) return 1;
  return Math.max(...activities.map((activity) => activity.position)) + 1;
};
