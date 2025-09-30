import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { deleteScheduledTasks } from "../axios/deleteScheduledTasks";
import { scheduledTasksQueryOptions } from "../queries";

const scheduledKey = scheduledTasksQueryOptions().queryKey;

export const useDeleteScheduledTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScheduledTasks,
    onMutate: async () => {
      await queryClient.cancelQueries(scheduledTasksQueryOptions());

      const { rollback } = snapshotQueries(queryClient, [scheduledKey]);

      // Empty scheduled tasks cache
      queryClient.setQueryData(scheduledKey, []);

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
