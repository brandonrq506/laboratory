import { Option } from "@/types/core";

export type CreateForm = {
  avg_time: number;
  category_id: Option | null;
  max_time: number;
  name: string;
};
