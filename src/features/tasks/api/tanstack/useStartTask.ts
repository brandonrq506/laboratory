import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
  taskByIdQueryOptions,
  taskKeys,
} from "../queries";
import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { promoteScheduledToInProgress } from "../orchestrator";
import { startTask } from "../axios/startTask";

const inProgressKey = inProgressTasksQueryOptions().queryKey;
const scheduledKey = scheduledTasksQueryOptions().queryKey;

export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTask,
    onMutate: async (newInProgressTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const detailKey = taskByIdQueryOptions(newInProgressTask.id).queryKey;

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
        inProgressTasksQueryOptions(),
        scheduledTasksQueryOptions(),
        taskByIdQueryOptions(newTask.id),
      );
    },
  });
};
