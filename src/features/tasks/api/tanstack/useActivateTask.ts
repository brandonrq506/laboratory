import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  inProgressTaskOptions,
  scheduledTasksOptions,
  taskDetailsOptions,
  todayCompletedTasksOptions,
} from "../queryOptions";
import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { activateScheduledTask } from "../orchestrator";
import { activateTask } from "../axios/activateTask";
import { taskKeys } from "../queryKeys";

const inProgressKey = inProgressTaskOptions().queryKey;
const scheduledKey = scheduledTasksOptions().queryKey;
const completedKey = todayCompletedTasksOptions().queryKey;

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
        taskDetailsOptions(variables.taskId).queryKey,
        taskDetailsOptions(inProgressTask.id).queryKey,
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
        inProgressTaskOptions(),
        scheduledTasksOptions(),
        todayCompletedTasksOptions(),
        ...(data
          ? [
              taskDetailsOptions(data.previous_task.id),
              taskDetailsOptions(data.current_task.id),
            ]
          : []),
      );
    },
  });
};
