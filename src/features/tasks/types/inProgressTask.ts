import { BaseTaskAPI } from "./baseTask";

export interface InProgressTaskAPI extends BaseTaskAPI {
  status: "in_progress";
  start_time: string;
  end_time: null;
}
