import { useMutation, useQueryClient } from "@tanstack/react-query";

import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import { createActivityRoutine } from "../axios/createActivityRoutine";

export const useCreateActivityRoutine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createActivityRoutine,
    onSuccess: (_, { routineId }) => {
      // Todo: Improve cache update. This is too broad.
      queryClient.invalidateQueries(routineListQueryOptions());
      queryClient.invalidateQueries(routineByIdQueryOptions(routineId));
    },
  });
};
