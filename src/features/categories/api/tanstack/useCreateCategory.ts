import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CATEGORIES_ENDPOINT } from "@/libs/axios";
import { createCategory } from "../axios/createCategory";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_ENDPOINT] });
    },
  });
};
