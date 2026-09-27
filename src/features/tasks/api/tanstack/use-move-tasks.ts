import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { moveTasks } from "../axios/move-tasks";

import type { ScheduledListQueryOptions } from "@/features/tasks/types/scheduled-list-query-options";

export const useMoveTasks = (listQueryOptions: ScheduledListQueryOptions) => {
  const queryClient = useQueryClient();
  const { queryKey } = listQueryOptions;

  return useMutation({
    mutationFn: moveTasks,
    onMutate: async ({ tasks }) => {
      await queryClient.cancelQueries({ queryKey });

      const { rollback } = snapshotQueries(queryClient, [queryKey]);

      queryClient.setQueryData(queryKey, tasks);

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
