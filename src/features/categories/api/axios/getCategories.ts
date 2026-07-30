import type { CategoryModel } from "../../types/category-model";
import type { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";
import type { categoryKeys } from "../queries";

export const getCategories = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof categoryKeys.lists>>) => {
  const [{ feature }] = queryKey;

  const response = await apiV1.get<CategoryModel[]>(feature, { signal });
  return response.data;
};
