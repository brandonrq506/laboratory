import { TaskModel } from "./taskModel";

export interface TaskActivateResponse {
  previous_task: TaskModel;
  current_task: TaskModel;
}
