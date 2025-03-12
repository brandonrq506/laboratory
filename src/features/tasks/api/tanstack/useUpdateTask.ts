import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BaseTaskAPI } from "../../types/baseTask";
import { taskKeys } from "../queryKeys";
import { updateTask } from "../axios/updateTask";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async ({ task, taskId }) => {
      const queryKey = { queryKey: taskKeys.lists() };

      await queryClient.cancelQueries(queryKey);

      const prevQueries = queryClient.getQueriesData(queryKey);

      queryClient.setQueriesData(queryKey, (oldTasks: BaseTaskAPI[]) => {
        return oldTasks.map((oldTask) =>
          oldTask.id === taskId ? { ...oldTask, ...task } : oldTask,
        );
      });

      return { prevQueries };
    },
    onError: (_, __, context) => {
      if (context?.prevQueries) {
        context.prevQueries.forEach(([queryKey, prevData]) => {
          queryClient.setQueryData(queryKey, prevData);
        });
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
