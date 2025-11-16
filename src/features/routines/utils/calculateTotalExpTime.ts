import type { RoutineItem } from "../types/routine-item";

export const calculateTotalExpTime = (routineItems: RoutineItem[]) => {
  return routineItems.reduce((total, item) => {
    return total + item.item_exp_seconds;
  }, 0);
};
