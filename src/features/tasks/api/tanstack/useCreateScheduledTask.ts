import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addEnd } from "@/utils/array";
import { createScheduledTask } from "../axios/createScheduledTask";
import { scheduledTasksQueryOptions } from "../queries";

export const useCreateScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createScheduledTask,

    onSuccess: (newTask) => {
      queryClient.setQueryData(scheduledTasksQueryOptions().queryKey, (old) =>
        addEnd(old, newTask),
      );
      queryClient.invalidateQueries(scheduledTasksQueryOptions());
    },
  });
};
