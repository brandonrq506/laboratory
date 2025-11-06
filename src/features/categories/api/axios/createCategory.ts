import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { CategoryModel } from "../../types/category-model";
import type { CategoryPostPayload } from "../../types/category-post-payload";

export const createCategory = async (category: CategoryPostPayload) => {
  const response = await apiV1.post<CategoryModel>(
    CATEGORIES_ENDPOINT,
    category,
  );
  return response.data;
};
