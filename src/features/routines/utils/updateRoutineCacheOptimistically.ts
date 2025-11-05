import type { QueryClient, QueryKey } from "@tanstack/react-query";

import { addEnd } from "@/utils/array";

import type { RoutineActivity } from "../types/routine-activity";
import type { RoutineWithActivities } from "../types/routine-with-activities";

interface UpdateRoutineCacheParams {
  queryClient: QueryClient;
  routineId: number;
  newActivity: RoutineActivity;
  singleQueryKey: QueryKey;
  listQueryKey: QueryKey;
}

export const updateRoutineCacheOptimistically = ({
  queryClient,
  routineId,
  newActivity,
  singleQueryKey,
  listQueryKey,
}: UpdateRoutineCacheParams): void => {
  // Update single routine cache
  queryClient.setQueryData(
    singleQueryKey,
    (prev: RoutineWithActivities | undefined) =>
      prev
        ? {
            ...prev,
            activities: addEnd(prev.activities, newActivity),
          }
        : prev,
  );

  // Update routine list cache
  queryClient.setQueryData(
    listQueryKey,
    (prev: RoutineWithActivities[] | undefined) => {
      if (!prev) return prev;
      return prev.map((item) =>
        item.id === routineId
          ? {
              ...item,
              activities: addEnd(item.activities, newActivity),
            }
          : item,
      );
    },
  );
};
