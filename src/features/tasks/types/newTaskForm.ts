import { Option } from "@/types/core";

export interface NewTaskForm {
  activity: Option | null;
  end_time: string;
  note: string;
  status: "completed";
  start_time: string;
}
