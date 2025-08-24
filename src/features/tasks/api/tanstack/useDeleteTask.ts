import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BaseTaskAPI } from "../../types/baseTask";
import { deleteTask } from "../axios/deleteTask";
import { taskDetailsOptions } from "../queryOptions";
import { taskKeys } from "../queryKeys";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: async (taskId) => {
      const listsQuery = { queryKey: taskKeys.lists() };
      const detailQuery = { queryKey: taskKeys.detail(taskId) };

      await queryClient.cancelQueries(listsQuery);
      await queryClient.cancelQueries(detailQuery);

      const prevQueries = queryClient.getQueriesData(listsQuery);
      const prevDetail = queryClient.getQueryData(
        taskDetailsOptions(taskId).queryKey,
      );

      // Remove task from all lists optimistically
      queryClient.setQueriesData(listsQuery, (oldTasks: BaseTaskAPI[]) => {
        return oldTasks.filter((oldTask) => oldTask.id !== taskId);
      });

      // Remove task detail cache
      queryClient.removeQueries({ queryKey: taskKeys.detail(taskId) });

      return { prevQueries, prevDetail };
    },

    onError: (_, taskId, context) => {
      if (context?.prevQueries) {
        context.prevQueries.forEach(([queryKey, prevData]) => {
          queryClient.setQueryData(queryKey, prevData);
        });
      }

      if (context?.prevDetail) {
        queryClient.setQueryData(
          taskDetailsOptions(taskId).queryKey,
          context.prevDetail,
        );
      }
    },

    onSettled: (_, __, taskId) => {
      // Invalidate all task queries to ensure consistency
      queryClient.invalidateQueries({ queryKey: taskKeys.all });

      //Ensure the deleted task's detail query is completely removed since the task no longer exists
      queryClient.removeQueries({ queryKey: taskKeys.detail(taskId) });
    },
  });
};
