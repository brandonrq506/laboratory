import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTask } from "../axios/deleteTask";
import { taskKeys } from "../queryKeys";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: taskKeys.all,
      });
    },
  });
};
