import { CompletedTaskAPI } from "./completedTask";
import { InProgressTaskAPI } from "./inProgressTask";
import { ScheduledTaskAPI } from "./scheduledTask";

export type TaskAPI = ScheduledTaskAPI | InProgressTaskAPI | CompletedTaskAPI;
