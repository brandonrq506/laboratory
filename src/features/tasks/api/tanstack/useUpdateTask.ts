import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskByIdQueryOptions, taskKeys } from "../queries";
import { BaseTaskAPI } from "../../types/baseTask";
import { TaskAPI } from "../../types/task";
import { snapshotQueries } from "@/utils/tanstack/helpers";
import { updateTask } from "../axios/updateTask";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async ({ task, taskId }) => {
      const listsQuery = { queryKey: taskKeys.lists() };
      const detailQuery = { queryKey: taskKeys.detail(taskId) };

      await queryClient.cancelQueries(listsQuery);
      await queryClient.cancelQueries(detailQuery);

      const { rollback } = snapshotQueries(queryClient, [
        listsQuery.queryKey,
        detailQuery.queryKey,
      ]);

      // Update task on all lists optimistically
      queryClient.setQueriesData(listsQuery, (oldTasks: BaseTaskAPI[]) =>
        oldTasks.map((ot) => (ot.id === taskId ? { ...ot, ...task } : ot)),
      );

      // Update details in case user clicks on task
      queryClient.setQueryData(taskByIdQueryOptions(taskId).queryKey, (prev) =>
        prev ? ({ ...prev, ...task } as TaskAPI) : undefined,
      );

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
