import { TaskAPI } from "./taskAPI";

export interface InProgressTaskAPI extends TaskAPI {
  status: "in-progress";
  start_time: string;
  end_time: null;
}
