import type { RoutineItem } from "./routine-activity";

export type RoutineItemWithExpectedStartTime = RoutineItem & {
  expected_start_time: Date;
};
