import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import { deleteRoutineItem } from "../axios/delete-routine-item";
import { removeById } from "@/utils/array";

export const useDeleteRoutineItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRoutineItem,
    onMutate: async ({ itemId, routineId }) => {
      const singleKey = routineByIdQueryOptions(routineId).queryKey;
      const listKey = routineListQueryOptions().queryKey;

      await queryClient.cancelQueries({ queryKey: singleKey });
      await queryClient.cancelQueries({ queryKey: listKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey, listKey]);

      // Remove activity from single routine cache optimistically
      queryClient.setQueryData(singleKey, (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          routine_items: removeById(prev.routine_items, itemId),
        };
      });

      // Remove activity from routine list cache optimistically
      queryClient.setQueryData(listKey, (prev) => {
        if (!prev) return prev;
        return prev.map((routine) =>
          routine.id === routineId
            ? {
                ...routine,
                routine_items: removeById(routine.routine_items, itemId),
              }
            : routine,
        );
      });

      return { rollback };
    },
    onError: (_, __, context) => {
      context?.rollback();
    },
    onSettled: (_, __, { routineId }) => {
      invalidateQueries(
        queryClient,
        routineListQueryOptions(),
        routineByIdQueryOptions(routineId),
      );
    },
  });
};
