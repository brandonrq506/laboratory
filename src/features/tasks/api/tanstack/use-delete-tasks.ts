import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { deleteTasks } from "../axios/delete-tasks";

import type { ScheduledListQueryOptions } from "@/features/tasks/types/scheduled-list-query-options";

export const useDeleteTasks = (listQueryOptions: ScheduledListQueryOptions) => {
  const queryClient = useQueryClient();
  const { queryKey } = listQueryOptions;

  return useMutation({
    mutationFn: deleteTasks,
    onMutate: async ({ task_ids }) => {
      await queryClient.cancelQueries({ queryKey });

      const { rollback } = snapshotQueries(queryClient, [queryKey]);

      queryClient.setQueryData(queryKey, (prev) =>
        prev ? prev.filter((task) => !task_ids.includes(task.id)) : [],
      );

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      invalidateQueries(queryClient, listQueryOptions);
    },
  });
};
