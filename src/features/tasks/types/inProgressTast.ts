import { TaskAPI } from "./taskAPI";

export interface CurrentTaskAPI extends TaskAPI {
  status: "in-progress";
  start_time: string;
  end_time: null;
}