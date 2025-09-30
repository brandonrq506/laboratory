import { useMutation, useQueryClient } from "@tanstack/react-query";

import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import { deleteRoutine } from "../axios/deleteRoutine";

export const useDeleteRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoutine,
    onSuccess: (_, routineId) => {
      queryClient.invalidateQueries(routineListQueryOptions());
      queryClient.removeQueries(routineByIdQueryOptions(routineId));
    },
  });
};
