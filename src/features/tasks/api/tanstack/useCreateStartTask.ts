import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createStartTask } from "../axios/createStartTask";
import { inProgressTaskOptions } from "../queryOptions";

export const useCreateStartTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStartTask,
    onSuccess: () => {
      queryClient.invalidateQueries(inProgressTaskOptions());
    },
  });
};
