import { CATEGORIES_ENDPOINT } from "@/libs/axios";
import { queryOptions } from "@tanstack/react-query";

import { getCategories } from "./axios/getCategories";
import { getCategory } from "./axios/getCategory";

export const categoryKeys = {
  all: [{ feature: CATEGORIES_ENDPOINT }] as const,
  lists: () => [{ ...categoryKeys.all[0], entity: "list" }] as const,
  details: () => [{ ...categoryKeys.all[0], entity: "details" }] as const,
  detail: (categoryId: number) =>
    [{ ...categoryKeys.details()[0], categoryId }] as const,
};

export const categoryByIdQueryOptions = (categoryId: number) => {
  return queryOptions({
    queryKey: categoryKeys.detail(categoryId),
    queryFn: getCategory,
  });
};

export const categoryListQueryOptions = () => {
  return queryOptions({
    queryKey: categoryKeys.lists(),
    queryFn: getCategories,
  });
};
