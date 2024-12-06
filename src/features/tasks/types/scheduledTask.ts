import { TaskAPI } from "./task";

export interface ScheduledTaskAPI extends TaskAPI {
  status: "scheduled";
  start_time: null;
  end_time: null;
}
