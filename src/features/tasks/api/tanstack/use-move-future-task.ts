import { useMutation, useQueryClient } from "@tanstack/react-query";

import { futureTasksQueryOptions } from "../queries";
import { invalidateQueries } from "@/utils/tanstack/helpers";
import { moveFutureTask } from "../axios/move-future-task";

export const useFutureMoveTask = (date: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveFutureTask,
    onSettled: () => {
      invalidateQueries(queryClient, futureTasksQueryOptions(date));
    },
  });
};
