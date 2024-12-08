import { useMutation, useQueryClient } from "@tanstack/react-query";

import { startTask } from "../axios/startTask";
import { taskKeys } from "../queryKeys";

export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
};
