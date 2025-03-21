import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTaskDown } from "../axios/moveTaskDown";
import { taskKeys } from "../queryKeys";

export const useMoveTaskDown = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTaskDown,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
