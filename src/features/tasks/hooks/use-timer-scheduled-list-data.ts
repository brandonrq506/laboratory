import { useQuery } from "@tanstack/react-query";

import {
  inProgressTasksQueryOptions,
  timerScheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { calculateExpectedStartTimes } from "@/features/tasks/utils/calculateExpectedStartTimes";
import { useScheduledListData } from "@/features/tasks/hooks/use-scheduled-list-data";

/**
 * The /timer list: `displayTasks` gain an expected start time chained after
 * the in-progress task. `rawItems` stay server-shaped, so EST never reaches
 * the cache.
 */
export const useTimerScheduledListData = () => {
  const list = useScheduledListData(timerScheduledTasksQueryOptions());
  const { data: inProgress } = useQuery(inProgressTasksQueryOptions());

  return {
    ...list,
    displayTasks: calculateExpectedStartTimes(list.rawItems, inProgress?.[0]),
  };
};
