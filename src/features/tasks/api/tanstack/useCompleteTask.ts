import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTasksQueryOptions,
  taskByIdQueryOptions,
  taskKeys,
  todayCompletedTasksQueryOptions,
} from "../queries";
import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { completeInProgressTask } from "../orchestrator";
import { completeTask } from "../axios/completeTask";

const inProgressTaskKeys = inProgressTasksQueryOptions().queryKey;
const completedTaskKeys = todayCompletedTasksQueryOptions().queryKey;

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onMutate: async (newCompletedTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const detailKey = taskByIdQueryOptions(newCompletedTask.id).queryKey;

      const { rollback } = snapshotQueries(queryClient, [
        inProgressTaskKeys,
        completedTaskKeys,
        detailKey,
      ]);

      completeInProgressTask({
        qc: queryClient,
        task: newCompletedTask,
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: (_, __, newCompletedTask) => {
      invalidateQueries(
        queryClient,
        inProgressTasksQueryOptions(),
        todayCompletedTasksQueryOptions(),
        taskByIdQueryOptions(newCompletedTask.id),
      );
    },
  });
};
