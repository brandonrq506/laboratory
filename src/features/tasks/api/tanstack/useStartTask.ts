/* eslint-disable max-lines-per-function */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  scheduledTasksOptions,
  taskDetailsOptions,
} from "../queryOptions";
import { startTask } from "../axios/startTask";
import { taskKeys } from "../queryKeys";

export const useStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startTask,
    onMutate: async (newInProgressTask) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const prevScheduled = queryClient.getQueryData(
        scheduledTasksOptions().queryKey,
      );

      const prevDetail = queryClient.getQueryData(
        taskDetailsOptions(newInProgressTask.id).queryKey,
      );

      // Add new in_progress to in_progress tasks cache
      queryClient.setQueryData(inProgressTaskOptions().queryKey, [
        newInProgressTask,
      ]);

      // Remove new in_progress from the scheduled tasks cache
      queryClient.setQueryData(
        scheduledTasksOptions().queryKey,
        (previousTasks) => {
          if (previousTasks) {
            return previousTasks.filter(
              (task) => task.id !== newInProgressTask.id,
            );
          }
          return [];
        },
      );

      // Update details in case user clicks on this task
      queryClient.setQueryData(
        taskDetailsOptions(newInProgressTask.id).queryKey,
        newInProgressTask,
      );

      return { prevScheduled, prevDetail };
    },
    onError: (_, __, context) => {
      if (context?.prevScheduled) {
        queryClient.setQueryData(
          scheduledTasksOptions().queryKey,
          context.prevScheduled,
        );
      }

      if (context?.prevDetail) {
        queryClient.setQueryData(
          taskDetailsOptions(context.prevDetail.id).queryKey,
          context.prevDetail,
        );
      }

      // Guaranteed there was no in_progres task before this, so this is the prev state.
      queryClient.setQueryData(inProgressTaskOptions().queryKey, []);
    },
    onSettled: (newCompletedTask) => {
      queryClient.invalidateQueries(inProgressTaskOptions());

      queryClient.invalidateQueries(scheduledTasksOptions());

      if (newCompletedTask)
        queryClient.invalidateQueries(taskDetailsOptions(newCompletedTask.id));
    },
  });
};
