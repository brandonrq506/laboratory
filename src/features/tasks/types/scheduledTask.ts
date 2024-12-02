import { TaskAPI } from "./taskAPI";

export interface ScheduledTaskAPI extends TaskAPI {
  status: "scheduled";
  start_time: null;
  end_time: null;
}
