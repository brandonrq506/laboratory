import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateTask } from "../axios/activateTask";
import {
  inProgressTaskOptions,
  scheduledTasksOptions,
  todayCompletedTasksOptions,
} from "../queryOptions";

export const useActivateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateTask,
    onSuccess: () => {
      queryClient.invalidateQueries(inProgressTaskOptions());
      queryClient.invalidateQueries(scheduledTasksOptions());
      queryClient.invalidateQueries(todayCompletedTasksOptions());
    },
  });
};
