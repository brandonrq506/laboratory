import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../axios/createTask";
import { taskKeys } from "../queryKeys";

//TODO: These will be "scheduled" by default, so maybe just remove those
export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
