import type { CARD_TYPE } from "./card-types";
import type { ScheduledTaskAPI } from "./scheduledTask";
import type { WrapCardSortableId } from "@/types/routines";

export interface PlainScheduledCard<T extends ScheduledTaskAPI> {
  id: number;
  kind: typeof CARD_TYPE.TASK;
  task: T;
}

export interface WrappedRoutineCard<T extends ScheduledTaskAPI> {
  id: WrapCardSortableId;
  absorbed_task_ids: number[];
  absorbed_tasks: T[];
  kind: typeof CARD_TYPE.WRAP;
  member_ids: number[];
  routine_application_id: number;
  routine_name: string;
  total_seconds: number;
}

/**
 * Render-time wrap. `expanded` is resolved by the projection: user-expanded
 * AND not the card currently being dragged.
 */
export interface WrappedRoutineRenderCard<
  T extends ScheduledTaskAPI,
> extends WrappedRoutineCard<T> {
  expanded: boolean;
}

export interface ExpandedChildCard<T extends ScheduledTaskAPI> {
  id: number;
  kind: typeof CARD_TYPE.EXPANDED_CHILD;
  task: T;
}

export type ScheduledGroupedItem<T extends ScheduledTaskAPI> =
  PlainScheduledCard<T> | WrappedRoutineCard<T>;

export type ScheduledRenderItem<T extends ScheduledTaskAPI> =
  PlainScheduledCard<T> | WrappedRoutineRenderCard<T> | ExpandedChildCard<T>;
