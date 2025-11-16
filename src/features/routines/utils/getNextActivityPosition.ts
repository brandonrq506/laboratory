import type { RoutineWithItems } from "../types/routine-with-items";

export const getNextActivityPosition = (
  items: RoutineWithItems["routine_items"] | undefined,
): number => {
  if (!items?.length) return 1;
  return Math.max(...items.map((item) => item.position)) + 1;
};
