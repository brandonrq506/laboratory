import type { QueryClient, QueryKey } from "@tanstack/react-query";

import { addEnd } from "@/utils/array";

import type { RoutineItem } from "../types/routine-activity";
import type { RoutineWithItems } from "../types/routine-with-items";

interface UpdateRoutineCacheParams {
  queryClient: QueryClient;
  routineId: number;
  newItem: RoutineItem;
  singleQueryKey: QueryKey;
  listQueryKey: QueryKey;
}

export const updateRoutineCacheOptimistically = ({
  queryClient,
  routineId,
  newItem,
  singleQueryKey,
  listQueryKey,
}: UpdateRoutineCacheParams): void => {
  // Update single routine cache
  queryClient.setQueryData(
    singleQueryKey,
    (prev: RoutineWithItems | undefined) =>
      prev
        ? {
            ...prev,
            routine_items: addEnd(prev.routine_items, newItem),
          }
        : prev,
  );

  // Update routine list cache
  queryClient.setQueryData(
    listQueryKey,
    (prev: RoutineWithItems[] | undefined) => {
      if (!prev) return prev;
      return prev.map((routine) =>
        routine.id === routineId
          ? {
              ...routine,
              routine_items: addEnd(routine.routine_items, newItem),
            }
          : routine,
      );
    },
  );
};
