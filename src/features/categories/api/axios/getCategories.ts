import { Category } from "../../types/category";
import { QueryFunctionContext } from "@tanstack/react-query";
import { apiV1 } from "@/libs/axios";
import { categoryKeys } from "../queries";

export const getCategories = async ({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof categoryKeys.lists>>) => {
  const [{ feature }] = queryKey;

  const response = await apiV1.get<Category[]>(feature, { signal });
  return response.data;
};
