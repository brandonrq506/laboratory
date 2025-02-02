import { CATEGORIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";

export const deleteCategory = async (categoryId: number) => {
  const URL = `${USERS_ENDPOINT}/1${CATEGORIES_ENDPOINT}/${categoryId}`;
  await apiV1.delete(URL);
};
