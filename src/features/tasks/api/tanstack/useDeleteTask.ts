import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BaseTaskAPI } from "../../types/baseTask";
import { deleteTask } from "../axios/deleteTask";
import { removeById } from "@/utils/array";
import { snapshotQueries } from "@/utils/tanstack/helpers";
import { taskKeys } from "../queries";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: async (taskId) => {
      const listsQuery = { queryKey: taskKeys.lists() };
      const detailQuery = { queryKey: taskKeys.detail(taskId) };

      await queryClient.cancelQueries(listsQuery);
      await queryClient.cancelQueries(detailQuery);

      const { rollback } = snapshotQueries(queryClient, [
        listsQuery.queryKey,
        detailQuery.queryKey,
      ]);

      // Remove task from all lists optimistically
      queryClient.setQueriesData(listsQuery, (oldTasks: BaseTaskAPI[]) =>
        removeById(oldTasks, taskId),
      );

      // Remove task detail cache
      queryClient.removeQueries({ queryKey: taskKeys.detail(taskId) });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      // Invalidate all task queries since we don't know the lists this task belongs to
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
