import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import { MoveActivityRoutine } from "../axios/moveActivityRoutine";
import { ROUTINES_ENDPOINT } from "@/libs/axios";
import type { Routine } from "../../types/routine";

export const useMoveActivityRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: MoveActivityRoutine,
    onMutate: async ({ routine_id, activities }) => {
      const singleKey = [ROUTINES_ENDPOINT, routine_id];
      const listKey = [ROUTINES_ENDPOINT];

      await queryClient.cancelQueries({ queryKey: singleKey });
      await queryClient.cancelQueries({ queryKey: listKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey, listKey]);

      // Update the activities of this routine optimistically in the single routine cache
      queryClient.setQueryData(singleKey, (prev: Routine | undefined) =>
        prev ? { ...prev, activities } : undefined,
      );

      // Update the routines list cache to keep the card in sync
      queryClient.setQueryData(listKey, (prev: Routine[] | undefined) => {
        if (!prev) return prev;
        return prev.map((routine) =>
          routine.id === routine_id ? { ...routine, activities } : routine,
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
