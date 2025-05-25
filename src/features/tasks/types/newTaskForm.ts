import { Option } from "@/types/core";

export interface NewTaskForm {
  status: "completed";
  start_time: string;
  end_time: string;
  activity: Option | null;
}
