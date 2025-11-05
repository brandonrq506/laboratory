import type { CategoryModel } from "../../types/category-model";
import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";
import { categoryKeys } from "../queries";

export const getCategory = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof categoryKeys)["detail"]>>) => {
  const [{ feature, categoryId }] = queryKey;
  const URL = `${feature}/${categoryId}`;

  const response = await apiV1.get<CategoryModel>(URL, { signal });
  return response.data;
};
