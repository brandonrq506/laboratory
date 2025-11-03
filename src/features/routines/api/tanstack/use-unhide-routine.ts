import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineKeys } from "../queries";
import type { Routine } from "../../types/routine";
import { unhideRoutine } from "../axios/unhide-routine";

export const useUnhideRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unhideRoutine,
    onMutate: async (routineId) => {
      const singleKey = routineByIdQueryOptions(routineId).queryKey;

      await queryClient.cancelQueries({ queryKey: singleKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey]);

      // Optimistically update routine detail cache
      queryClient.setQueryData(singleKey, (prev: Routine | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          hidden_at: null,
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
