import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { scheduledTasksQueryOptions } from "@/features/tasks/api/queries";
import { spanDeleteTasks } from "../axios/span-delete-tasks";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

export const useBulkDeleteTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: spanDeleteTasks,
    onMutate: async ({ task_ids }) => {
      const scheduledTaskKeys = scheduledTasksQueryOptions().queryKey;

      await queryClient.cancelQueries({ queryKey: scheduledTaskKeys });

      const { rollback } = snapshotQueries(queryClient, [scheduledTaskKeys]);

      queryClient.setQueryData(
        scheduledTaskKeys,
        (prev: ScheduledTaskAPI[] | undefined) =>
          prev ? prev.filter((task) => !task_ids.includes(task.id)) : [],
      );

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
