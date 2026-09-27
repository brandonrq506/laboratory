import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { ScheduledListQueryOptions } from "@/features/tasks/types/scheduled-list-query-options";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const STABLE_EMPTY_ARRAY: ScheduledTaskAPI[] = [];

/**
 * Source of truth for one scheduled-tasks list. Owns the optimistic pin
 * (`tempItems`): while non-null it overrides the server data, so the UI shows
 * the post-drag order before the mutation resolves. `displayTasks` is
 * `rawItems` as-is; pages that render derived fields layer them on top.
 */
export const useScheduledListData = (
  listQueryOptions: ScheduledListQueryOptions,
) => {
  const listQuery = useQuery(listQueryOptions);

  const [tempItems, setTempItems] = useState<ScheduledTaskAPI[] | null>(null);

  const rawItems = tempItems ?? listQuery.data ?? STABLE_EMPTY_ARRAY;

  return {
    listQueryOptions,
    rawItems,
    displayTasks: rawItems,
    setTempItems,
    isPending: listQuery.isPending,
    isError: listQuery.isError,
    refetch: listQuery.refetch,
  };
};
