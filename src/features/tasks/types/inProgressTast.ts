import { TaskAPI } from "./task";

export interface InProgressTaskAPI extends TaskAPI {
  status: "in_progress";
  start_time: string;
  end_time: null;
}
