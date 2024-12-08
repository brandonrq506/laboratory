import { useMutation, useQueryClient } from "@tanstack/react-query";

import { restartTask } from "../axios/restartTask";
import { taskKeys } from "../queryKeys";

export const useReStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restartTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.list("completed") });
      queryClient.invalidateQueries({ queryKey: taskKeys.list("in_progress") });
    },
  });
};
