export interface ActivityRoutineItem {
  id: number;
  type: "activity";
  item_name: string;
  item_exp_seconds: number;
  category_name: string;
  category_color: string;
  position: number;
}

export interface NestedRoutineItem {
  id: number;
  type: "routine";
  item_name: string;
  item_exp_seconds: number;
  category_name: null;
  category_color: null;
  position: number;
}

export type RoutineItem = ActivityRoutineItem | NestedRoutineItem;
