import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createQuickTask } from "../axios/createQuickTask";
import { scheduledTasksOptions } from "../queryOptions";
import { taskKeys } from "../queryKeys";

import { ScheduledTaskAPI } from "../../types/scheduledTask";

export const useCreateScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuickTask,

    onMutate: async (activity) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const previousTasks = queryClient.getQueryData(
        scheduledTasksOptions().queryKey,
      );

      const newScheduledTask: ScheduledTaskAPI = {
        activity,
        status: "scheduled",
        position: "9999",
        start_time: null,
        end_time: null,
        optional_name: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        // This is a temporary ID for optimistic updates
        id: Math.random(),
      };

      // Add new scheduled task to the end of scheduled tasks cache
      queryClient.setQueryData(scheduledTasksOptions().queryKey, (old) => {
        if (old) {
          return [...old, newScheduledTask];
        }
        return [newScheduledTask];
      });

      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          scheduledTasksOptions().queryKey,
          context.previousTasks,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(scheduledTasksOptions());
    },
  });
};
