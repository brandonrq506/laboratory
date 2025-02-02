import { CATEGORIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { PostCategory } from "../../types/postCategory";

// TODO: Revoved hardcored user id
const URL = `${USERS_ENDPOINT}/1${CATEGORIES_ENDPOINT}`;

export const createCategory = async (category: PostCategory) => {
  const { data } = await apiV1.post<PostCategory>(URL, category);
  return data;
};
