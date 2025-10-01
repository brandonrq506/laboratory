import { useMutation, useQueryClient } from "@tanstack/react-query";

import { invalidateQueries, snapshotQueries } from "@/utils/tanstack/helpers";
import { routineByIdQueryOptions, routineListQueryOptions } from "../queries";

import { buildTemporaryRoutineActivity } from "../../utils/buildTemporaryRoutineActivity";
import { createActivityRoutine } from "../axios/createActivityRoutine";
import { getActivityFromCache } from "../../../../utils/tanstack/helpers";
import { getNextActivityPosition } from "../../utils/getNextActivityPosition";
import { updateRoutineCacheOptimistically } from "../../utils/updateRoutineCacheOptimistically";

export const useCreateActivityRoutine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createActivityRoutine,
    onMutate: async ({ activityId, routineId }) => {
      const singleQuery = routineByIdQueryOptions(routineId);
      const listQuery = routineListQueryOptions();

      await queryClient.cancelQueries(singleQuery);
      await queryClient.cancelQueries(listQuery);

      const { rollback } = snapshotQueries(queryClient, [
        singleQuery.queryKey,
        listQuery.queryKey,
      ]);

      const activity = getActivityFromCache(queryClient, activityId);
      if (!activity) return { rollback };

      const routine = queryClient.getQueryData(singleQuery.queryKey);
      const routineList = queryClient.getQueryData(listQuery.queryKey);
      const routineFromList = routineList?.find(
        (item) => item.id === routineId,
      );

      const nextPosition = getNextActivityPosition(
        routine?.activities ?? routineFromList?.activities,
      );

      const temporaryActivity = buildTemporaryRoutineActivity(
        activity,
        nextPosition,
      );

      updateRoutineCacheOptimistically({
        queryClient,
        routineId,
        newActivity: temporaryActivity,
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
