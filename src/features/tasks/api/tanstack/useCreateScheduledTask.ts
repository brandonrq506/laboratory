import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addEnd } from "@/utils/array";
import { buildTemporaryScheduledTask } from "../../utils/buildTemporaryScheduledTask";
import { createQuickTask } from "../axios/createQuickTask";
import { scheduledTasksOptions } from "../queryOptions";
import { snapshotQueries } from "@/utils/tanstack/helpers";

const scheduledKey = scheduledTasksOptions().queryKey;

export const useCreateScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuickTask,

    onMutate: async (activity) => {
      await queryClient.cancelQueries(scheduledTasksOptions());

      const { rollback } = snapshotQueries(queryClient, [scheduledKey]);

      const newScheduledTask = buildTemporaryScheduledTask(activity);

      // Add new scheduled task to the end of scheduled tasks cache
      queryClient.setQueryData(scheduledTasksOptions().queryKey, (old) =>
        addEnd(old, newScheduledTask),
      );

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries(scheduledTasksOptions());
    },
  });
};
