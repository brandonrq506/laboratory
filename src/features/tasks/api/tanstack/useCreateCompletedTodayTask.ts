import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  taskByIdQueryOptions,
  taskKeys,
  todayCompletedTasksQueryOptions,
} from "../queries";
import { createTask } from "../axios/createTask";
import { isBefore } from "date-fns";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

export const useCreateCompletedTodayTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: (createdTask) => {
      // Just in case someone calls this hook and provides a task that is not completed.
      if (createdTask.status !== TASK_STATUS.COMPLETED) {
        queryClient.invalidateQueries({ queryKey: taskKeys.all });
        return;
      }

      const completedKey = todayCompletedTasksQueryOptions().queryKey;

      queryClient.setQueryData(completedKey, (previousTasks) => {
        if (!previousTasks) return [createdTask];

        // Is this existing task older than the newly created task? Stops at the first task where the answer is true and returns its position.
        const index = previousTasks.findIndex((task) =>
          isBefore(task.start_time, createdTask.start_time),
        );

        if (index === -1) return [...previousTasks, createdTask];

        return [
          ...previousTasks.slice(0, index),
          createdTask,
          ...previousTasks.slice(index),
        ];
      });

      queryClient.setQueryData(
        taskByIdQueryOptions(createdTask.id).queryKey,
        createdTask,
      );
    },
  });
};
