import { InProgressTaskAPI } from "./inProgressTask";
import { Option } from "@/types/core";

export interface InProgressFormType {
  activity: Option;
  start_time: InProgressTaskAPI["start_time"];
}
