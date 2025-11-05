import { BaseEntity } from "@/types/core";
import type { CategoryModel } from "@/features/categories/types/category-model";

export type ActivityAPI = BaseEntity & {
  category: CategoryModel;
  display_name: string;
  exp_seconds: number;
  max_seconds: number;
  name: string;
  user_id: number;
};
