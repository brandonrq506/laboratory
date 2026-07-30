export const ROUTINE_ITEM_TYPE = {
  ACTIVITY: "activity",
  ROUTINE: "routine",
} as const;

export interface ActivityRoutineItem {
  id: number;
  type: typeof ROUTINE_ITEM_TYPE.ACTIVITY;
  item_name: string;
  item_exp_seconds: number;
  category_name: string;
  category_color: string;
  position: number;
}

export interface NestedRoutineItem {
  id: number;
  type: typeof ROUTINE_ITEM_TYPE.ROUTINE;
  item_name: string;
  item_exp_seconds: number;
  category_name: null;
  category_color: null;
  position: number;
}

export type RoutineItem = ActivityRoutineItem | NestedRoutineItem;
