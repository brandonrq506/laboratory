import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTaskTop } from "../axios/moveTaskTop";
import { taskKeys } from "../queryKeys";

export const useMoveTaskTop = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTaskTop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
