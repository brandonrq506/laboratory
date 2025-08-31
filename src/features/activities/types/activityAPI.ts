import { BaseEntity } from "@/types/core";
import { Category } from "@/features/categories/types/category";

export type ActivityAPI = BaseEntity & {
  exp_seconds: number;
  category: Category;
  display_name: string;
  max_seconds: number;
  name: string;
  user_id: number;
};
