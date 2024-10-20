import { useQuery } from "@tanstack/react-query";

import { CATEGORIES_ENDPOINT } from "@/libs/axios";
import { getCategories } from "../axios/getCategories";

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES_ENDPOINT],
    queryFn: getCategories,
  });
};