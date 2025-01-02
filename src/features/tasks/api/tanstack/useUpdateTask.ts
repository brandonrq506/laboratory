import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskKeys } from "../queryKeys";
import { updateTask } from "../axios/updateTask";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
