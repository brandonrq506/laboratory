import { CompletedTaskAPI } from "./completedTask";
import { Option } from "@/types/core";

export type CompletedTaskFormType = Pick<
  CompletedTaskAPI,
  "start_time" | "end_time"
> & {
  activity: Option;
};
