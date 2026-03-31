import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries } from "@/utils/tanstack/helpers";
import { moveFutureTask } from "../axios/move-future-task";
import { scheduledTasksListQueryKey } from "../queries";

export const useFutureMoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveFutureTask,
    onSettled: () => {
      invalidateQueries(queryClient, scheduledTasksListQueryKey());
    },
  });
};
