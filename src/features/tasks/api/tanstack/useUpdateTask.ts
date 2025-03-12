import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BaseTaskAPI } from "../../types/baseTask";
import { taskKeys } from "../queryKeys";
import { updateTask } from "../axios/updateTask";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async ({ task, taskId }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const previousTaskQueries = queryClient.getQueriesData({
        queryKey: taskKeys.lists(),
      });

      queryClient.setQueriesData(
        { queryKey: taskKeys.lists() },
        (oldTasks: BaseTaskAPI[]) => {
          return oldTasks.map((oldTask) =>
            oldTask.id === taskId ? { ...oldTask, ...task } : oldTask,
          );
        },
      );

      return { previousTaskQueries };
    },
    onError: (_, __, context) => {
      if (context?.previousTaskQueries) {
        context.previousTaskQueries.forEach(([queryKey, previousData]) => {
          queryClient.setQueryData(queryKey, previousData);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
