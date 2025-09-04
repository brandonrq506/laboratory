import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ActivityAPI } from "@/features/activities/types/activityAPI";

import { activityKeys } from "@/features/activities/api/queryKeys";
import { buildTemporaryCompletedTask } from "../../utils/buildTemporaryCompletedTask";
import { createTask } from "../axios/createTask";
import { isBefore } from "date-fns";
import { snapshotQueries } from "@/utils/tanstack/helpers";
import { todayCompletedTasksOptions } from "../queryOptions";

const completedTaskKeys = todayCompletedTasksOptions().queryKey;

export const useCreateCompletedTodayTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(todayCompletedTasksOptions());

      const { rollback } = snapshotQueries(queryClient, [completedTaskKeys]);

      const activities = queryClient.getQueryData<ActivityAPI[]>(
        activityKeys.lists(),
      );

      const activity = activities?.find((a) => a.id === newTask.activity_id);

      if (!activity) {
        console.error("Activity should always be defined here.");
        return;
      }

      const newCompletedTask = buildTemporaryCompletedTask(
        activity,
        newTask.start_time ?? new Date().toISOString(),
        newTask.end_time ?? new Date().toISOString(),
        newTask.note || "",
      );

      /*
          Add new completed task to today's completed tasks cache
          Since it is sorted by start_time in descending order.
          isBefore is true when task.start_time is older than the new one.
          So you insert before this older task to keep the list in newest-to-oldest order.
       */

      queryClient.setQueryData(completedTaskKeys, (previousTasks) => {
        if (!previousTasks) return [newCompletedTask];

        const index = previousTasks.findIndex((task) =>
          isBefore(task.start_time, newCompletedTask.start_time!),
        );

        if (index === -1) return [newCompletedTask, ...previousTasks];

        return [
          ...previousTasks.slice(0, index),
          newCompletedTask,
          ...previousTasks.slice(index),
        ];
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      queryClient.invalidateQueries(todayCompletedTasksOptions());
    },
  });
};
