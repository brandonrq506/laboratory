import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTaskUp } from "../axios/moveTaskUp";
import { taskKeys } from "../queryKeys";

export const useMoveTaskUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTaskUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
