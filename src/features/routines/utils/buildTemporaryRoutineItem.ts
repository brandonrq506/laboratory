import type { ActivityWithCategory } from "@/features/activities/types/activity-with-category";
import type { RoutineItem } from "../types/routine-item";
import type { RoutineWithItems } from "../types/routine-with-items";

import { calculateTotalExpTime } from "./calculateTotalExpTime";

let tempRoutineItemIdCounter = -1;

type ActivitySourceParams = {
  source: "activity";
  activity: ActivityWithCategory;
  position: number;
};

type NestedRoutineSourceParams = {
  source: "routine";
  routine: RoutineWithItems;
  position: number;
};

export type BuildTemporaryRoutineItemParams =
  | ActivitySourceParams
  | NestedRoutineSourceParams;

export const buildTemporaryRoutineItem = (
  params: BuildTemporaryRoutineItemParams,
): RoutineItem => {
  if (params.source === "activity") {
    const { activity, position } = params;

    return {
      id: tempRoutineItemIdCounter--,
      type: "activity",
      item_name: activity.display_name,
      item_exp_seconds: activity.exp_seconds,
      category_name: activity.category.name,
      category_color: activity.category.color,
      position,
    };
  }

  const { routine, position } = params;

  return {
    id: tempRoutineItemIdCounter--,
    type: "routine",
    item_name: routine.name,
    item_exp_seconds: calculateTotalExpTime(routine.routine_items),
    category_name: null,
    category_color: null,
    position,
  };
};
