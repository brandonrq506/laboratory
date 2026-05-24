import { ScheduledTaskAPI } from "./scheduledTask";

export interface ScheduledTaskWithEST extends ScheduledTaskAPI {
  expected_start_time: Date;
}
