import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addEnd } from "@/utils/array";
import { buildTemporaryScheduledTask } from "../../utils/buildTemporaryScheduledTask";
import { createQuickTask } from "../axios/createQuickTask";
import { scheduledTasksQueryOptions } from "../queries";
import { snapshotQueries } from "@/utils/tanstack/helpers";

const scheduledKey = scheduledTasksQueryOptions().queryKey;

export const useCreateScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuickTask,

    onMutate: async (activity) => {
      await queryClient.cancelQueries(scheduledTasksQueryOptions());

      const { rollback } = snapshotQueries(queryClient, [scheduledKey]);

      const newScheduledTask = buildTemporaryScheduledTask(activity);

      // Add new scheduled task to the end of scheduled tasks cache
      queryClient.setQueryData(scheduledTasksQueryOptions().queryKey, (old) =>
        addEnd(old, newScheduledTask),
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
