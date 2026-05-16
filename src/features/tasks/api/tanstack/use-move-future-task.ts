import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { futureTasksQueryOptions } from "../queries";
import { moveFutureTask } from "../axios/move-future-task";

export const useFutureMoveTask = (date: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveFutureTask,
    onMutate: async ({ tasks }) => {
      const futureTaskKeys = futureTasksQueryOptions(date).queryKey;

      await queryClient.cancelQueries({ queryKey: futureTaskKeys });

      const { rollback } = snapshotQueries(queryClient, [futureTaskKeys]);

      queryClient.setQueryData(futureTaskKeys, tasks);

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      invalidateQueries(queryClient, futureTasksQueryOptions(date));
    },
  });
};
