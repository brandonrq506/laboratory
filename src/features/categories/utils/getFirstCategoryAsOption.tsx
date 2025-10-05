import { Category } from "../types/category";
import { Option } from "@/types/core";

import { transformToOption } from "@/utils";

type fnType = (categories: Category[] | undefined) => Option | null;

// Todo: This no longer needs to accept null or undefined.
export const getFirstCategoryAsOption: fnType = (categories) => {
  if (categories === undefined) return null;

  if (categories.length === 0) return null;

  return transformToOption(categories[0], "id", "name");
};
