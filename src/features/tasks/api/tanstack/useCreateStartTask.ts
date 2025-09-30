import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createStartTask } from "../axios/createStartTask";
import { inProgressTasksQueryOptions } from "../queries";

export const useCreateStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStartTask,
    onSuccess: () => {
      queryClient.invalidateQueries(inProgressTasksQueryOptions());
    },
  });
};
