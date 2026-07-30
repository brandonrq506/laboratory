import type { InProgressTaskAPI } from "./inProgressTask";
import type { Option } from "@/types/core";

export interface InProgressFormType {
  activity: Option;
  start_time: InProgressTaskAPI["start_time"];
  note: InProgressTaskAPI["note"];
}
