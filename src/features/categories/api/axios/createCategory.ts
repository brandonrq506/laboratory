import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { CategoryModel } from "../../types/category-model";
import { PostCategory } from "../../types/postCategory";

export const createCategory = async (category: PostCategory) => {
  const response = await apiV1.post<CategoryModel>(CATEGORIES_ENDPOINT, category);
  return response.data;
};
