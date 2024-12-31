import { CompletedTaskAPI } from "./completedTask";
import { InProgressTaskAPI } from "./inProgressTast";
import { ScheduledTaskAPI } from "./scheduledTask";

export type TaskAPI = ScheduledTaskAPI | InProgressTaskAPI | CompletedTaskAPI;
