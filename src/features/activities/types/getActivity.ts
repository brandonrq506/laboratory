import { BaseEntity } from "@/types/core";

export type GetActivity = BaseEntity & {
  avg_time: number | null;
  category_id: number;
  max_time: number | null;
  name: string | null;
  user_id: number;
};
