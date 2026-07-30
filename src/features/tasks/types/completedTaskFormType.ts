import type { CompletedTaskAPI } from "./completedTask";
import type { Option } from "@/types/core";

export type CompletedTaskFormType = Pick<
  CompletedTaskAPI,
  "start_time" | "end_time"
> & {
  activity: Option;
  note: string;
};
