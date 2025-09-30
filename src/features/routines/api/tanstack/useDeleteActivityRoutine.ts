import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteActivityRoutine } from "../axios/deleteActivityRoutine";
import { routineKeys } from "../queries";

export const useDeleteActivityRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteActivityRoutine,
    onSuccess: () => {
      // TODO: Improve cache update. This is too broad.
      queryClient.invalidateQueries({ queryKey: routineKeys.all });
    },
  });
};
