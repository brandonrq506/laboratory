import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  taskDetailsOptions,
  todayCompletedTasksOptions,
} from "../queryOptions";
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

      const prevInProgress = queryClient.getQueryData(inProgressTaskKeys)!;

      const prevCompleted = queryClient.getQueryData(completedTaskKeys);

      const prevDetail = queryClient.getQueryData(
        taskDetailsOptions(newCompletedTask.id).queryKey,
      );

      // Add in_progress to the completed tasks
      queryClient.setQueryData(completedTaskKeys, (previousTasks) => {
        if (previousTasks) {
          return [newCompletedTask, ...previousTasks];
        }
        return [newCompletedTask];
      });

      // Set in_progress to empty array
      queryClient.setQueryData(inProgressTaskKeys, []);

      // Set detail to the new completed task
      queryClient.setQueryData(
        taskDetailsOptions(newCompletedTask.id).queryKey,
        newCompletedTask,
      );

      return { prevInProgress, prevCompleted, prevDetail };
    },
    onError: (_, __, context) => {
      if (context?.prevInProgress) {
        queryClient.setQueryData(inProgressTaskKeys, context.prevInProgress);
      }

      if (context?.prevCompleted) {
        queryClient.setQueryData(completedTaskKeys, context.prevCompleted);
      }

      if (context?.prevDetail) {
        queryClient.setQueryData(
          taskDetailsOptions(context.prevDetail.id).queryKey,
          context.prevDetail,
        );
      }
    },
    onSettled: (newCompletedTask) => {
      // Invalidate in progress query
      queryClient.invalidateQueries(inProgressTaskOptions());

      // Invalidate completed query
      queryClient.invalidateQueries(todayCompletedTasksOptions());

      // Invalidate detail query
      if (newCompletedTask)
        queryClient.invalidateQueries(taskDetailsOptions(newCompletedTask.id));
    },
  });
};
