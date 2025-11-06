import { Option } from "@/types/core";

export type CreateForm = {
  category_id: Option | null;
  display_name: string;
  exp_time_hours: number;
  exp_time_minutes: number;
  max_time_hours: number;
  max_time_minutes: number;
  name: string;
};
