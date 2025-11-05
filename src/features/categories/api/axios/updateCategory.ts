import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { CategoryModel } from "../../types/category-model";
import type { CategoryPatchPayload } from "../../types/category-patch-payload";

type Props = {
  category: CategoryPatchPayload;
  categoryId: number;
};

export const updateCategory = async ({ category, categoryId }: Props) => {
  const URL = `${CATEGORIES_ENDPOINT}/${categoryId}`;

  const response = await apiV1.patch<CategoryModel>(URL, category);
  return response.data;
};
