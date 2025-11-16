// Todo: Remove this type once all components have been migrated to use RoutineItem.
export interface RoutineActivity {
  id: number;
  activity_id: number;
  activity_name: string;
  activity_exp_seconds: number;
  category_name: string;
  category_color: string;
  position: number;
}

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
  item_name: string | null;
  item_exp_seconds: number;
  category_name: null;
  category_color: null;
  position: number;
}

// Discriminated union matching the Rails serializer's `routine_items`
export type RoutineItem = ActivityRoutineItem | NestedRoutineItem;
