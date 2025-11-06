import type { ActivityModel } from "./activity-model";
import type { CategoryModel } from "@/features/categories/types/category-model";

export type ActivityWithCategory = Omit<ActivityModel, "category_id"> & {
  category: CategoryModel;
};
