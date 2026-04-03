import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createScheduledTask } from "../axios/createScheduledTask";
import { taskKeys } from "../queries";

export const useCreateScheduledTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createScheduledTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: taskKeys.list({ filter: { status: { eq: "scheduled" } } }),
      });
    },
  });
};
