import type { CategoryModel } from "../types/category-model";
import type { Option } from "@/types/core";

import { transformToOption } from "@/utils";

export const getFirstCategoryAsOption = (
  categories: CategoryModel[],
): Option | null => {
  if (categories.length === 0) return null;

  return transformToOption(categories[0], "id", "name");
};
