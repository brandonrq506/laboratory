import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  todayCompletedTasksOptions,
} from "../queryOptions";
import { completeTask } from "../axios/completeTask";
import { taskKeys } from "../queryKeys";

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onMutate: async (newCompletedTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const prevInProgress = queryClient.getQueryData(
        inProgressTaskOptions().queryKey,
      )!;

      const prevCompleted = queryClient.getQueryData(
        todayCompletedTasksOptions().queryKey,
      );

      // Add in_progress to the completed tasks
      queryClient.setQueryData(
        todayCompletedTasksOptions().queryKey,
        (previousTasks) => {
          if (previousTasks) {
            return [newCompletedTask, ...previousTasks];
          }
          return [newCompletedTask];
        },
      );

      // Set in_progress to empty array
      queryClient.setQueryData(inProgressTaskOptions().queryKey, []);

      return { prevInProgress, prevCompleted };
    },
    onError: (_, __, context) => {
      if (context?.prevInProgress) {
        queryClient.setQueryData(
          inProgressTaskOptions().queryKey,
          context.prevInProgress,
        );
      }

      if (context?.prevCompleted) {
        queryClient.setQueryData(
          todayCompletedTasksOptions().queryKey,
          context.prevCompleted,
        );
      }
    },
    onSettled: () => {
      // Invalidate in progress query
      queryClient.invalidateQueries(inProgressTaskOptions());

      // Invalidate completed query
      queryClient.invalidateQueries(todayCompletedTasksOptions());
    },
  });
};
