import { useMutation, useQueryClient } from "@tanstack/react-query";

import { completeTask } from "../axios/completeTask";
import { taskKeys } from "../queryKeys";

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.list("in_progress") });
      queryClient.invalidateQueries({ queryKey: taskKeys.list("completed") });
    },
  });
};
