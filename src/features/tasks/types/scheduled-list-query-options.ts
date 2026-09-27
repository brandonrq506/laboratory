import type { scheduledListQueryOptions } from "../api/queries";

/** A scheduled-tasks list sorted by position; the cache a list reads and its mutations write. */
export type ScheduledListQueryOptions = ReturnType<
  typeof scheduledListQueryOptions
>;
