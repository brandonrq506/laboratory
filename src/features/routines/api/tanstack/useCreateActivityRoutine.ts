/* eslint-disable max-lines-per-function */
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  type CreateRoutineItemPayload,
  createActivityRoutine,
} from "../axios/createActivityRoutine";
import {
  getActivityFromCache,
  invalidateQueries,
  snapshotQueries,
} from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";
import type { RoutineItem } from "../../types/routine-activity";
import type { RoutineWithItems } from "../../types/routine-with-items";
import { buildTemporaryRoutineItem } from "../../utils/buildTemporaryRoutineItem";
import { getNextActivityPosition } from "../../utils/getNextActivityPosition";
import { updateRoutineCacheOptimistically } from "../../utils/updateRoutineCacheOptimistically";

type ActivityMutationVariables = Extract<
  CreateRoutineItemPayload,
  { activityId: number }
>;

const isActivityMutation = (
  variables: CreateRoutineItemPayload,
): variables is ActivityMutationVariables => "activityId" in variables;

export const useCreateActivityRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivityRoutine,
    onMutate: async (variables) => {
      const { routineId } = variables;
      const singleQuery = routineByIdQueryOptions(routineId);
      const listQuery = routineListQueryOptions();

      await queryClient.cancelQueries(singleQuery);
      await queryClient.cancelQueries(listQuery);

      const { rollback } = snapshotQueries(queryClient, [
        singleQuery.queryKey,
        listQuery.queryKey,
      ]);

      const routine = queryClient.getQueryData<RoutineWithItems>(
        singleQuery.queryKey,
      );
      const routineList = queryClient.getQueryData<RoutineWithItems[]>(
        listQuery.queryKey,
      );
      const routineFromList = routineList?.find(
        (item) => item.id === routineId,
      );

      const nextPosition = getNextActivityPosition(
        routine?.routine_items ?? routineFromList?.routine_items,
      );

      let temporaryItem: RoutineItem | null = null;

      if (isActivityMutation(variables)) {
        const activity = getActivityFromCache(
          queryClient,
          variables.activityId,
        );
        if (!activity) return { rollback };

        temporaryItem = buildTemporaryRoutineItem({
          source: "activity",
          activity,
          position: nextPosition,
        });
      } else {
        const nestedRoutineFromList = routineList?.find(
          (item) => item.id === variables.nestedRoutineId,
        );
        const nestedRoutine =
          nestedRoutineFromList ??
          queryClient.getQueryData<RoutineWithItems>(
            routineByIdQueryOptions(variables.nestedRoutineId).queryKey,
          );

        if (!nestedRoutine) {
          console.error(
            `Routine ${variables.nestedRoutineId} should exist in cache before creating a nested routine item.`,
          );
          return { rollback };
        }

        temporaryItem = buildTemporaryRoutineItem({
          source: "routine",
          routine: nestedRoutine,
          position: nextPosition,
        });
      }

      if (!temporaryItem) return { rollback };

      updateRoutineCacheOptimistically({
        queryClient,
        routineId,
        newItem: temporaryItem,
        singleQueryKey: singleQuery.queryKey,
        listQueryKey: listQuery.queryKey,
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
