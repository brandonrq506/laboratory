import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import {
  routineByIdQueryOptions,
  routineKeys,
  routineListQueryOptions,
} from "../queries";
import type { Routine } from "../../types/routine";
import { deleteRoutine } from "../axios/deleteRoutine";
import { removeById } from "@/utils/array";

export const useDeleteRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoutine,
    onMutate: async (routineId) => {
      const singleKey = routineByIdQueryOptions(routineId).queryKey;
      const listKey = routineListQueryOptions().queryKey;

      await queryClient.cancelQueries({ queryKey: singleKey });
      await queryClient.cancelQueries({ queryKey: listKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey, listKey]);

      // Remove routine from list cache optimistically
      queryClient.setQueryData(listKey, (prev: Routine[] | undefined) => {
        if (!prev) return prev;
        return removeById(prev, routineId);
      });

      // Remove routine detail cache
      queryClient.removeQueries({ queryKey: singleKey });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: (_, __, routineId) => {
      invalidateQueries(queryClient, { queryKey: routineKeys.lists() });
      queryClient.removeQueries(routineByIdQueryOptions(routineId));
    },
  });
};
