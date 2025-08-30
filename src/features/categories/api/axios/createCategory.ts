import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Category } from "../../types/category";
import { PostCategory } from "../../types/postCategory";

export const createCategory = async (category: PostCategory) => {
  const response = await apiV1.post<Category>(CATEGORIES_ENDPOINT, category);
  return response.data;
};
