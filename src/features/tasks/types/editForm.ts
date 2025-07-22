import { CompletedTaskAPI } from "./completedTask";
import { InProgressTaskAPI } from "./inProgressTask";
import { Option } from "@/types/core";

type EditableTask = CompletedTaskAPI | InProgressTaskAPI;

export type EditForm = Pick<EditableTask, "start_time" | "end_time"> & {
  activity: Option;
};
