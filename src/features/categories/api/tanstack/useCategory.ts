import { useQuery } from "@tanstack/react-query";

import { CATEGORIES_ENDPOINT } from "@/libs/axios";
import { getCategory } from "../axios/getCategory";

export const useCategory = (categoryId: number) => {
  return useQuery({
    queryKey: [CATEGORIES_ENDPOINT, categoryId],
    queryFn: ({ signal }) => getCategory({ categoryId, signal }),
  });
};
