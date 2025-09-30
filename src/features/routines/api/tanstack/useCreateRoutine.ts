import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createRoutine } from "../axios/createRoutine";
import { routineListQueryOptions } from "../queries";

export const useCreateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoutine,
    onSuccess: () => {
      queryClient.invalidateQueries(routineListQueryOptions());
    },
  });
};
