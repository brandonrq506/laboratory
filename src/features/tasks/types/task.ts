import type { CompletedTaskAPI } from "./completedTask";
import type { InProgressTaskAPI } from "./inProgressTask";
import type { ScheduledTaskAPI } from "./scheduledTask";

export type TaskAPI = ScheduledTaskAPI | InProgressTaskAPI | CompletedTaskAPI;
