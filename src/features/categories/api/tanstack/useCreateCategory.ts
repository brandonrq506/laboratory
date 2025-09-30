import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoryListQueryOptions } from "../queries";
import { createCategory } from "../axios/createCategory";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(categoryListQueryOptions());
    },
  });
};
