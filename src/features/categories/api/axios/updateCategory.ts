import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Category } from "../../types/category";
import { PatchCategory } from "../../types/patchCategory";

type Props = {
  category: PatchCategory;
  categoryId: number;
};

export const updateCategory = async ({ category, categoryId }: Props) => {
  const URL = `${CATEGORIES_ENDPOINT}/${categoryId}`;

  const response = await apiV1.patch<Category>(URL, category);
  return response.data;
};
