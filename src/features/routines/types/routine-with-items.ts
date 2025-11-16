import type { RoutineItem } from "./routine-activity";
import type { RoutineModel } from "./routine-model";

export interface RoutineWithItems extends RoutineModel {
  routine_items: RoutineItem[];
}
