import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { deleteScheduledTasks } from "../axios/deleteScheduledTasks";
import { timerScheduledTasksQueryOptions } from "../queries";

export const useDeleteScheduledTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteScheduledTasks,
    onMutate: async () => {
      const scheduledKey = timerScheduledTasksQueryOptions().queryKey;

      await queryClient.cancelQueries(timerScheduledTasksQueryOptions());

      const { rollback } = snapshotQueries(queryClient, [scheduledKey]);

      // Empty scheduled tasks cache
      queryClient.setQueryData(scheduledKey, []);

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      invalidateQueries(queryClient, timerScheduledTasksQueryOptions());
    },
  });
};
