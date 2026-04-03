import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addEnd, addStart } from "@/utils/array";
import { scheduledTasksQueryOptions, taskKeys } from "../queries";
import { createScheduledTask } from "../axios/createScheduledTask";

export const useCreateScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createScheduledTask,

    onSuccess: (newTask, { insertMode }) => {
      queryClient.setQueryData(scheduledTasksQueryOptions().queryKey, (old) =>
        insertMode === "prepend"
          ? addStart(old, newTask)
          : addEnd(old, newTask),
      );
      queryClient.invalidateQueries({
        queryKey: taskKeys.list({ filter: { status: { eq: "scheduled" } } }),
      });
    },
  });
};
