import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { moveTask } from "../axios/moveTask";
import { scheduledTasksQueryOptions } from "../queries";

export const useMoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTask,
    onMutate: async ({ tasks }) => {
      const scheduledTaskKeys = scheduledTasksQueryOptions().queryKey;

      await queryClient.cancelQueries({ queryKey: scheduledTaskKeys });

      const { rollback } = snapshotQueries(queryClient, [scheduledTaskKeys]);

      queryClient.setQueryData(scheduledTaskKeys, tasks);

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      invalidateQueries(queryClient, scheduledTasksQueryOptions());
    },
  });
};
