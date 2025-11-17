import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import { moveRoutineItem } from "../axios/move-routine-item";

export const useMoveRoutineItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveRoutineItem,
    onMutate: async ({ routine_id, routine_items }) => {
      const singleKey = routineByIdQueryOptions(routine_id).queryKey;
      const listKey = routineListQueryOptions().queryKey;

      await queryClient.cancelQueries({ queryKey: singleKey });
      await queryClient.cancelQueries({ queryKey: listKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey, listKey]);

      // Update the items of this routine optimistically in the single routine cache
      queryClient.setQueryData(singleKey, (prev) =>
        prev ? { ...prev, routine_items } : undefined,
      );

      // Update the routines list cache to keep the card in sync. Not needed if we migrate to a Table view.
      queryClient.setQueryData(listKey, (prev) => {
        if (!prev) return prev;
        return prev.map((routine) =>
          routine.id === routine_id ? { ...routine, routine_items } : routine,
        );
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: (_, __, { routine_id }) => {
      invalidateQueries(
        queryClient,
        routineListQueryOptions(),
        routineByIdQueryOptions(routine_id),
      );
    },
  });
};
