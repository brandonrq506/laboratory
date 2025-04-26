import { Option } from "@/types/core";

export type CreateForm = {
  avg_time_hours: number;
  avg_time_minutes: number;
  category_id: Option | null;
  max_time_hours: number;
  max_time_minutes: number;
  name: string;
};
