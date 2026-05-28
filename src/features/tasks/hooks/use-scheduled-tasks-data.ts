import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { calculateExpectedStartTimes } from "@/features/tasks/utils/calculateExpectedStartTimes";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const STABLE_EMPTY_ARRAY: ScheduledTaskAPI[] = [];

/**
 * Source of truth for the scheduled-tasks list. Owns the optimistic pin
 * (`tempItems`): while non-null it overrides the server data, so the UI shows
 * the post-drag order before the mutation resolves. `tasksWithEST` layers the
 * expected-start-time projection on top of `rawItems`.
 */
export const useScheduledTasksData = () => {
  const scheduledTasksQuery = useQuery(scheduledTasksQueryOptions());
  const { data: inProgress } = useQuery(inProgressTasksQueryOptions());

  const [tempItems, setTempItems] = useState<ScheduledTaskAPI[] | null>(null);

  const rawItems = tempItems ?? scheduledTasksQuery.data ?? STABLE_EMPTY_ARRAY;
  const tasksWithEST = calculateExpectedStartTimes(rawItems, inProgress?.[0]);

  return {
    rawItems,
    tasksWithEST,
    isPending: scheduledTasksQuery.isPending,
    isError: scheduledTasksQuery.isError,
    refetch: scheduledTasksQuery.refetch,
    setTempItems,
  };
};
