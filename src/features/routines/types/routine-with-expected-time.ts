import type { RoutineItem } from "./routine-item";

export type RoutineItemWithExpectedStartTime = RoutineItem & {
  expected_start_time: Date;
};
