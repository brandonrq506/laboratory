import { CATEGORIES_ENDPOINT, apiV1 } from "@/libs/axios";
import { Category } from "../../types/category";

type Props = {
  categoryId: number;
  signal: AbortSignal;
};

export const getCategory = async ({ categoryId, signal }: Props) => {
  const URL = `${CATEGORIES_ENDPOINT}/${categoryId}`;
  const { data } = await apiV1.get<Category[]>(URL, { signal });
  return data;
};
