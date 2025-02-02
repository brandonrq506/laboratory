import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CATEGORIES_ENDPOINT } from "@/libs/axios";
import { deleteCategory } from "../axios/deleteCategory";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_ENDPOINT] });
    },
  });
};
