import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import type { Routine } from "../../types/routine";
import { deleteActivityRoutine } from "../axios/deleteActivityRoutine";
import { removeById } from "@/utils/array";

export const useDeleteActivityRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivityRoutine,
    onMutate: async ({ activityId, routineId }) => {
      const singleKey = routineByIdQueryOptions(routineId).queryKey;
      const listKey = routineListQueryOptions().queryKey;

      await queryClient.cancelQueries({ queryKey: singleKey });
      await queryClient.cancelQueries({ queryKey: listKey });

      const { rollback } = snapshotQueries(queryClient, [singleKey, listKey]);

      // Remove activity from single routine cache optimistically
      queryClient.setQueryData(singleKey, (prev: Routine | undefined) => {
        if (!prev) return prev;
        return {
          ...prev,
          activities: removeById(prev.activities, activityId),
        };
      });

      // Remove activity from routine list cache optimistically
      queryClient.setQueryData(listKey, (prev: Routine[] | undefined) => {
        if (!prev) return prev;
        return prev.map((routine) =>
          routine.id === routineId
            ? {
                ...routine,
                activities: removeById(routine.activities, activityId),
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
