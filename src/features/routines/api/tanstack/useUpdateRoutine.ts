import { useMutation, useQueryClient } from "@tanstack/react-query";

import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import { updateRoutine } from "../axios/updateRoutine";

export const useUpdateRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRoutine,
    onSuccess: (_, { routineId }) => {
      queryClient.invalidateQueries(routineListQueryOptions());
      queryClient.invalidateQueries(routineByIdQueryOptions(routineId));
    },
  });
};
