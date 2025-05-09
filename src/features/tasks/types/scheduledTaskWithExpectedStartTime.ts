import { ScheduledTaskAPI } from "./scheduledTask";

export interface ScheduledTaskWithExpectedStartTime extends ScheduledTaskAPI {
  expected_start_time: Date;
}
