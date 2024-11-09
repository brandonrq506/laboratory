import { BaseEntity } from "@/types/core";
import { Category } from "@/features/categories/types/category";

export type ActivityAPI = BaseEntity & {
  avg_time: number | null;
  category: Category;
  max_time: number | null;
  name: string;
  user_id: number;
};
