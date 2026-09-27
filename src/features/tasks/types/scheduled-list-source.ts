import type { ScheduledListQueryOptions } from "./scheduled-list-query-options";
import type { ScheduledTaskAPI } from "./scheduledTask";

/** Pins an optimistic order over the server data; `null` releases the pin. */
export type SetTempItems = (next: ScheduledTaskAPI[] | null) => void;

export interface ScheduledListSource<T extends ScheduledTaskAPI> {
  /** The cache this list reads; every mutation on the list writes the same cache. */
  listQueryOptions: ScheduledListQueryOptions;
  /** Server-shaped tasks in the pinned (optimistic) order. What moves plan against and write. Never carries derived fields. */
  rawItems: readonly ScheduledTaskAPI[];
  /** The same tasks in the same order, in the shape the page renders (e.g. with EST on /timer). */
  displayTasks: readonly T[];
  setTempItems: SetTempItems;
}
