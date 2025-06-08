import { useMutation, useQueryClient } from "@tanstack/react-query";

import { moveTaskBottom } from "../axios/moveTaskBottom";
import { scheduledTasksOptions } from "../queryOptions";

const scheduledTasksKey = scheduledTasksOptions().queryKey;

export const useMoveTaskBottom = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveTaskBottom,

    onMutate: async (taskId: number) => {
      await queryClient.cancelQueries(scheduledTasksOptions());

      const prevTasks = queryClient.getQueryData(scheduledTasksKey)!;

      const taskToMove = prevTasks.find((task) => task.id === taskId);

      if (!taskToMove) throw new Error("Task not found");

      // Create a new array without the task
      const listWithoutMoved = prevTasks.filter((task) => task.id !== taskId);

      // Add the task to the end of the array (bottom position)
      const updatedTasks = [...listWithoutMoved, taskToMove];

      // Update the cache with our optimistic update
      queryClient.setQueryData(scheduledTasksKey, updatedTasks);

      return { prevTasks };
    },

    onError: (_, __, context) => {
      if (context?.prevTasks) {
        queryClient.setQueryData(scheduledTasksKey, context.prevTasks);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(scheduledTasksOptions());
    },
  });
};
