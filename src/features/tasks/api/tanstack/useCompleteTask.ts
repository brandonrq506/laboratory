import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  todayCompletedTasksOptions,
} from "../queryOptions";
import { CompletedTaskAPI } from "../../types/completedTask";
import { completeTask } from "../axios/completeTask";
import { taskKeys } from "../queryKeys";

// We may be able to remove this eslint-disable once we pass in the task instead of taskId.

// eslint-disable-next-line max-lines-per-function
export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeTask,
    onMutate: async () => {
      const queryKey = { queryKey: taskKeys.lists() };

      await queryClient.cancelQueries(queryKey);

      const prevInProgress = queryClient.getQueryData(
        inProgressTaskOptions().queryKey,
      )!;

      const inProgressTask: CompletedTaskAPI = {
        ...prevInProgress[0],
        status: "completed",
        end_time: new Date().toISOString(),
      };

      const prevCompleted = queryClient.getQueryData(
        todayCompletedTasksOptions().queryKey,
      );

      // Add in_progress to the completed tasks
      queryClient.setQueryData(
        todayCompletedTasksOptions().queryKey,
        (previousTasks) => {
          if (previousTasks) {
            return [inProgressTask, ...previousTasks];
          }
          return [inProgressTask];
        },
      );

      // Set in_progress to empty array
      queryClient.setQueryData(inProgressTaskOptions().queryKey, () => {
        return [];
      });

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
