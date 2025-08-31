import { BaseEntity } from "@/types/core";
import { Category } from "@/features/categories/types/category";

export type ActivityAPI = BaseEntity & {
  category: Category;
  display_name: string;
  exp_seconds: number;
  max_seconds: number;
  name: string;
  user_id: number;
};
