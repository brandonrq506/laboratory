import { Option } from "@/types/core";

export type CreateForm = {
  avg_time: string;
  category_id: Option | null;
  max_time: string;
  name: string;
};
