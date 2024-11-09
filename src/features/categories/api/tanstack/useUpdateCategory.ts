import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../axios/updateCategory";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
