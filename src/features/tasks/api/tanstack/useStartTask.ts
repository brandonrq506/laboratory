import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  scheduledTasksOptions,
  taskDetailsOptions,
} from "../queryOptions";
import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { promoteScheduledToInProgress } from "../orchestrator";
import { startTask } from "../axios/startTask";
import { taskKeys } from "../queryKeys";

const inProgressKey = inProgressTaskOptions().queryKey;
const scheduledKey = scheduledTasksOptions().queryKey;

export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTask,
    onMutate: async (newInProgressTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const detailKey = taskDetailsOptions(newInProgressTask.id).queryKey;

      const { rollback } = snapshotQueries(queryClient, [
        scheduledKey,
        inProgressKey,
        detailKey,
      ]);

      promoteScheduledToInProgress({
        qc: queryClient,
        task: newInProgressTask,
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: (_, __, newTask) => {
      invalidateQueries(
        queryClient,
        inProgressTaskOptions(),
        scheduledTasksOptions(),
        taskDetailsOptions(newTask.id),
      );
    },
  });
};
