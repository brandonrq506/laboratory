import { CATEGORIES_ENDPOINT, USERS_ENDPOINT, apiV1 } from "@/libs/axios";
import { Category } from "../../types/category";

// TODO: Remove hardcoded user id
const URL = `${USERS_ENDPOINT}/1${CATEGORIES_ENDPOINT}`;

type Props = { signal: AbortSignal };

export const getCategories = async ({ signal }: Props) => {
  const { data } = await apiV1.get<Category[]>(URL, { signal });
  return data;
};
