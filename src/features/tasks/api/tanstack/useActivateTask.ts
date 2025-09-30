import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
  taskByIdQueryOptions,
  taskKeys,
  todayCompletedTasksQueryOptions,
} from "../queries";
import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { activateScheduledTask } from "../orchestrator";
import { activateTask } from "../axios/activateTask";

const inProgressKey = inProgressTasksQueryOptions().queryKey;
const scheduledKey = scheduledTasksQueryOptions().queryKey;
const completedKey = todayCompletedTasksQueryOptions().queryKey;

export const useActivateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: activateTask,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.lists() });

      const inProgressTask = queryClient.getQueryData(inProgressKey)?.[0];

      if (!inProgressTask) {
        console.error("Should always have an in_progress task at this point");
        return;
      }

      const { rollback } = snapshotQueries(queryClient, [
        inProgressKey,
        scheduledKey,
        completedKey,
        taskByIdQueryOptions(variables.taskId).queryKey,
        taskByIdQueryOptions(inProgressTask.id).queryKey,
      ]);

      activateScheduledTask({
        qc: queryClient,
        taskIdToActivate: variables.taskId,
        timestamp: variables.timestamp,
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: (data) => {
      invalidateQueries(
        queryClient,
        inProgressTasksQueryOptions(),
        scheduledTasksQueryOptions(),
        todayCompletedTasksQueryOptions(),
        ...(data
          ? [
              taskByIdQueryOptions(data.previous_task.id),
              taskByIdQueryOptions(data.current_task.id),
            ]
          : []),
      );
    },
  });
};
