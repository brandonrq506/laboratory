import type { QueryClient } from "@tanstack/react-query";

import {
  futureTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { SCHEDULED_LIST_DATE } from "@/test/store/tasks";

import type { ScheduledListQueryOptions } from "@/features/tasks/types/scheduled-list-query-options";

// Fixed past timestamp: any write to the bystander cache replaces it with Date.now().
const BYSTANDER_SEEDED_AT = new Date("2026-01-01T00:00:00.000Z").getTime();

/**
 * Each scheduled list paired with the other one as a bystander, so list
 * mutation specs can prove they write to the cache they were given and no other.
 */
export const SCHEDULED_LIST_CASES = [
  {
    label: "timer",
    listQueryOptions: scheduledTasksQueryOptions(),
    bystanderQueryOptions: futureTasksQueryOptions(SCHEDULED_LIST_DATE),
  },
  {
    label: "future",
    listQueryOptions: futureTasksQueryOptions(SCHEDULED_LIST_DATE),
    bystanderQueryOptions: scheduledTasksQueryOptions(),
  },
];

export const seedBystander = (
  queryClient: QueryClient,
  { queryKey }: ScheduledListQueryOptions,
) => queryClient.setQueryData(queryKey, [], { updatedAt: BYSTANDER_SEEDED_AT });

/* MSW serves the same tasks for both filters, so comparing data proves nothing;
   cache metadata does. */
export const expectBystanderUntouched = (
  queryClient: QueryClient,
  { queryKey }: ScheduledListQueryOptions,
) => {
  const state = queryClient.getQueryState(queryKey);

  expect(state?.dataUpdatedAt).toBe(BYSTANDER_SEEDED_AT);
  expect(state?.isInvalidated).toBe(false);
};
