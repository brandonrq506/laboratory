import type { RoutineItem } from "./routine-activity";
import type { RoutineModel } from "./routine-model";

// Todo: Rename to RoutineWithItems
export interface RoutineWithActivities extends RoutineModel {
  routine_items: RoutineItem[];
}
