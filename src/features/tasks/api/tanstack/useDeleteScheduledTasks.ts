import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteScheduledTasks } from "../axios/deleteScheduledTasks";
import { taskKeys } from "../queryKeys";

export const useDeleteScheduledTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScheduledTasks,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: taskKeys.list({ filter: { status: "scheduled" } }),
      });
    },
  });
};
