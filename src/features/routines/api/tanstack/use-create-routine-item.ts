import { useMutation, useQueryClient } from "@tanstack/react-query";

import { routineByIdQueryOptions, routineKeys } from "../queries";
import { createRoutineItem } from "../axios/create-routine-item";
import { invalidateQueries } from "@/utils/tanstack/helpers";

export const useCreateRoutineItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRoutineItem,
    onSuccess(_, variables) {
      const { routineId } = variables;
      invalidateQueries(queryClient, routineByIdQueryOptions(routineId));
      queryClient.invalidateQueries({ queryKey: routineKeys.lists() });
    },
  });
};
