import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Category } from "../../types/category";

type Props = { signal: AbortSignal };

export const getCategories = async ({ signal }: Props) => {
  const { data } = await apiV1.get<Category[]>(CATEGORIES_ENDPOINT, { signal });
  return data;
};
