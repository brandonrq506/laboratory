import { Category } from "../../types/category";
import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";
import { categoryKeys } from "../queries";

export const getCategory = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<(typeof categoryKeys)["detail"]>>) => {
  const [{ feature, categoryId }] = queryKey;
  const URL = `${feature}/${categoryId}`;

  const response = await apiV1.get<Category>(URL, { signal });
  return response.data;
};
