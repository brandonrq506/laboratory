import { useMutation, useQueryClient } from "@tanstack/react-query";

import { BaseTaskAPI } from "../../types/baseTask";
import { TaskAPI } from "../../types/task";
import { taskDetailsOptions } from "../queryOptions";
import { taskKeys } from "../queryKeys";
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

      const prevQueries = queryClient.getQueriesData(listsQuery);
      const prevDetail = queryClient.getQueryData(
        taskDetailsOptions(taskId).queryKey,
      );

      queryClient.setQueriesData(listsQuery, (oldTasks: BaseTaskAPI[]) => {
        return oldTasks.map((oldTask) =>
          oldTask.id === taskId ? { ...oldTask, ...task } : oldTask,
        );
      });

      // Update details in case user clicks on task
      queryClient.setQueryData(
        taskDetailsOptions(taskId).queryKey,
        (prevData) =>
          prevData ? ({ ...prevData, ...task } as TaskAPI) : undefined,
      );

      return { prevQueries, prevDetail };
    },

    onError: (_, __, context) => {
      if (context?.prevQueries) {
        context.prevQueries.forEach(([queryKey, prevData]) => {
          queryClient.setQueryData(queryKey, prevData);
        });
      }

      if (context?.prevDetail) {
        queryClient.setQueryData(
          taskDetailsOptions(context.prevDetail.id).queryKey,
          context.prevDetail,
        );
      }
    },

    onSettled: (newUpdatedTask) => {
      // Could be better by just invalidating either scheduled, in_progress or completed
      queryClient.invalidateQueries({ queryKey: taskKeys.all });

      // Invalidate detail query
      if (newUpdatedTask)
        queryClient.invalidateQueries(taskDetailsOptions(newUpdatedTask.id));
    },
  });
};
