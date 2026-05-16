import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTasks } from "../axios/move-tasks";
import { scheduledTasksQueryOptions } from "../queries";
import { snapshotQueries } from "@/utils/tanstack/helpers";

export const useMoveTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTasks,
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
      queryClient.invalidateQueries(scheduledTasksQueryOptions());
    },
  });
};
