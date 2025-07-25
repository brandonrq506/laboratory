import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ACTIVITIES_ENDPOINT } from "@/libs/axios";
import { ActivityAPI } from "@/features/activities/types/activityAPI";
import { CompletedTaskAPI } from "../../types/completedTask";

import { createTask } from "../axios/createTask";
import { isBefore } from "date-fns";
import { todayCompletedTasksOptions } from "../queryOptions";

const completedTaskKeys = todayCompletedTasksOptions().queryKey;

export const useCreateCompletedTodayTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onMutate: async (newTask) => {
      await queryClient.cancelQueries(todayCompletedTasksOptions());

      const prevTasks = queryClient.getQueryData(completedTaskKeys);

      const activities = queryClient.getQueryData<ActivityAPI[]>([
        ACTIVITIES_ENDPOINT,
      ]);

      const activity = activities?.find((a) => a.id === newTask.activity_id);

      if (!activity) {
        console.error("Activity should always be defined here.");
        return;
      }

      const newCompletedTask: CompletedTaskAPI = {
        status: "completed",
        start_time: newTask.start_time!,
        end_time: newTask.end_time!,
        activity,
        optional_name: null,
        position: null,
        note: newTask.note || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: -1,
      };

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

      return { prevTasks };
    },
    onError: (_, __, context) => {
      if (context?.prevTasks)
        queryClient.setQueryData(completedTaskKeys, context.prevTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries(todayCompletedTasksOptions());
    },
  });
};
