import { BaseTaskAPI } from "./baseTask";

export interface ScheduledTaskAPI extends BaseTaskAPI {
  status: "scheduled";
  start_time: null;
  end_time: null;
}
