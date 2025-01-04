import { CompletedTaskAPI } from "./completedTask";
import { InProgressTaskAPI } from "./inProgressTast";

type EditableTask = CompletedTaskAPI | InProgressTaskAPI;

export type EditForm = Pick<EditableTask, "end_time" | "start_time">;
