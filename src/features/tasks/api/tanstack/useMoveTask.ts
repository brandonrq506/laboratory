import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTask } from "../axios/moveTask";
import { scheduledTasksOptions } from "../queryOptions";
import { useToast } from "@/components/core";

const scheduledTaskKeys = scheduledTasksOptions().queryKey;

export const useMoveTask = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

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
      
      showToast("error", "Task Move Failed", "Unable to reorder the tasks. Please try again.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: scheduledTaskKeys });
    },
  });
};
