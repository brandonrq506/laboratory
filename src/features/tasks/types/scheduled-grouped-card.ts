import type { CARD_TYPE } from "./card-types";
import type { ScheduledTaskWithEST } from "./scheduledTaskWithEST";
import type { WrapCardSortableId } from "@/types/routines";

export type PlainScheduledCard = {
  id: number;
  kind: typeof CARD_TYPE.TASK;
  task: ScheduledTaskWithEST;
};

export type WrappedRoutineCard = {
  id: WrapCardSortableId;
  absorbed_count: number;
  absorbed_task_ids: number[];
  absorbed_tasks: ScheduledTaskWithEST[];
  expected_start_time: Date;
  kind: typeof CARD_TYPE.WRAP;
  member_ids: number[];
  routine_application_id: number;
  routine_name: string;
  total_seconds: number;
};

type ExpandedCard = {
  id: number;
  kind: typeof CARD_TYPE.EXPANDED_CHILD;
  parent_routine_application_id: number;
  task: ScheduledTaskWithEST;
};

export type ScheduledGroupedItem = PlainScheduledCard | WrappedRoutineCard;

export type ScheduledRenderItem =
  | PlainScheduledCard
  | WrappedRoutineCard
  | ExpandedCard;
