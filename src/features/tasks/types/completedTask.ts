import { BaseTaskAPI } from "./baseTask";

export interface CompletedTaskAPI extends BaseTaskAPI {
  status: "completed";
  start_time: string;
  end_time: string;
}
