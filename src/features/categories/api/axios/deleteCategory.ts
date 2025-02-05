import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteCategory = async (categoryId: number) => {
  const URL = `${CATEGORIES_ENDPOINT}/${categoryId}`;
  await apiV1.delete(URL);
};
