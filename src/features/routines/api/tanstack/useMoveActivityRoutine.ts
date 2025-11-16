import type { RoutineWithItems } from "../../types/routine-with-items";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { moveActivityRoutine } from "../axios/moveActivityRoutine";

export const useMoveActivityRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveActivityRoutine,
    onMutate: async ({ routine_id, routine_items }) => {
      // Why not use routineByIdQueryOptions here? And get the type-safety benefit.
      const singleKey = [ROUTINES_ENDPOINT, routine_id];
      const listKey = [ROUTINES_ENDPOINT];

      await queryClient.cancelQueries({ queryKey: singleKey });
      await queryClient.cancelQueries({ queryKey: listKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey, listKey]);

      // Update the activities of this routine optimistically in the single routine cache
      queryClient.setQueryData(
        singleKey,
        (prev: RoutineWithItems | undefined) =>
          prev ? { ...prev, routine_items } : undefined,
      );

      // Update the routines list cache to keep the card in sync
      queryClient.setQueryData(
        listKey,
        (prev: RoutineWithItems[] | undefined) => {
          if (!prev) return prev;
          return prev.map((routine) =>
            routine.id === routine_id ? { ...routine, routine_items } : routine,
          );
        },
      );

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
