import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTask } from "../axios/moveTask";
import { scheduledTasksOptions } from "../queryOptions";

const scheduledTaskKeys = scheduledTasksOptions().queryKey;

export const useMoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTask,
    onMutate: async ({ tasks }) => {
      await queryClient.cancelQueries({ queryKey: scheduledTaskKeys });

      const previousTasks = queryClient.getQueryData(scheduledTaskKeys);

      queryClient.setQueryData(scheduledTaskKeys, tasks);

      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(scheduledTaskKeys, context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduledTaskKeys });
    },
  });
};
