import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { scheduledTasksQueryOptions } from "@/features/tasks/api/queries";
import { spanMoveTasks } from "../axios/span-move-tasks";

export const useMoveTaskSpan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: spanMoveTasks,
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
