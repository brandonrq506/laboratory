import { TaskAPI } from "./taskAPI";

export interface CompletedTaskAPI extends TaskAPI {
  status: "completed";
  start_time: string;
  end_time: string;
}
