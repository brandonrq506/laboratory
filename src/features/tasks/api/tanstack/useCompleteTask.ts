import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  taskDetailsOptions,
  todayCompletedTasksOptions,
} from "../queryOptions";
import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { completeInProgressTask } from "../orchestrator";
import { completeTask } from "../axios/completeTask";
import { taskKeys } from "../queryKeys";

const inProgressTaskKeys = inProgressTaskOptions().queryKey;
const completedTaskKeys = todayCompletedTasksOptions().queryKey;

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onMutate: async (newCompletedTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const detailKey = taskDetailsOptions(newCompletedTask.id).queryKey;

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
        inProgressTaskOptions(),
        todayCompletedTasksOptions(),
        taskDetailsOptions(newCompletedTask.id),
      );
    },
  });
};
