import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTaskBottom } from "../axios/moveTaskBottom";
import { taskKeys } from "../queryKeys";

export const useMoveTaskBottom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTaskBottom,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
