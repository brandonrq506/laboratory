import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineKeys } from "../queries";
import { hideRoutine } from "../axios/hide-routine";

export const useHideRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: hideRoutine,
    onMutate: async (routineId) => {
      const singleKey = routineByIdQueryOptions(routineId).queryKey;

      await queryClient.cancelQueries({ queryKey: singleKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey]);

      // Optimistically update routine detail cache
      queryClient.setQueryData(singleKey, (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          hidden_at: new Date().toISOString(),
        };
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: () => {
      invalidateQueries(queryClient, { queryKey: routineKeys.lists() });
    },
  });
};
