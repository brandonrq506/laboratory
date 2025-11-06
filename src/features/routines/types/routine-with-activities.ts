import type { RoutineActivity } from "./routine-activity";
import type { RoutineModel } from "./routine-model";

export interface RoutineWithActivities extends RoutineModel {
  activities: RoutineActivity[];
}
