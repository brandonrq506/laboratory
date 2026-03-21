import { BaseTaskAPI } from "./baseTask";

export interface ScheduledTaskAPI extends BaseTaskAPI {
  status: "scheduled";
  start_time: null;
  scheduled_at: string;
  end_time: null;
  position: string;
}
