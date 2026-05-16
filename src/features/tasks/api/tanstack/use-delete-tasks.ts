import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { deleteTasks } from "../axios/delete-tasks";
import { scheduledTasksQueryOptions } from "../queries";
import { snapshotQueries } from "@/utils/tanstack/helpers";

// TODO: Currently only supports deleting scheduled tasks, make it generic.
export const useDeleteTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTasks,
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
      queryClient.invalidateQueries(scheduledTasksQueryOptions());
    },
  });
};
