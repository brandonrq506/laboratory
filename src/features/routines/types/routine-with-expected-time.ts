import type { RoutineActivity } from "./routine-activity";

export interface RoutineActivityWithExpectedStartTime extends RoutineActivity {
  expected_start_time: Date;
}
