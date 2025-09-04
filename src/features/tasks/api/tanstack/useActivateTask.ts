import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  scheduledTasksOptions,
  todayCompletedTasksOptions,
} from "../queryOptions";
import { activateTask } from "../axios/activateTask";
import { invalidateQueries } from "@/utils/tanstack/helpers";

export const useActivateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateTask,
    onSuccess: () => {
      invalidateQueries(
        queryClient,
        inProgressTaskOptions(),
        scheduledTasksOptions(),
        todayCompletedTasksOptions(),
      );
    },
  });
};
