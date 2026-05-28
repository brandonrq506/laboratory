import {
  computeRestDestIndex,
  findWrap,
} from "@/features/tasks/utils/anchor-lookup";
import {
  isWrapSortableId,
  parseWrapSortableId,
} from "@/features/routines/utils/wrap-sortable-id";
import { arrayMoveSpan } from "@/features/tasks/utils/array-move-span";

import type { ScheduledGroupedItem } from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { SortableId } from "@/features/tasks/types/sortable-task-list";

export const sameOrder = (
  a: ScheduledTaskAPI[],
  b: ScheduledTaskAPI[],
): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) return false;
  }
  return true;
};

export type SingleMovePlan = {
  nextRaw: ScheduledTaskAPI[];
  taskId: number;
  prevTaskId: number | null;
  nextTaskId: number | null;
};

export const planSingleMove = (
  rawItems: ScheduledTaskAPI[],
  groupedItems: ScheduledGroupedItem[],
  activeId: number,
  prevItemId: SortableId | null,
): SingleMovePlan | null => {
  const spanIds: ReadonlySet<number> = new Set([activeId]);
  const restDestIndex = computeRestDestIndex(
    rawItems,
    spanIds,
    prevItemId,
    groupedItems,
  );
  const nextRaw = arrayMoveSpan(rawItems, spanIds, restDestIndex);
  if (sameOrder(nextRaw, rawItems)) return null;

  const taskIndex = nextRaw.findIndex((t) => t.id === activeId);
  return {
    nextRaw,
    taskId: activeId,
    prevTaskId: nextRaw[taskIndex - 1]?.id ?? null,
    nextTaskId: nextRaw[taskIndex + 1]?.id ?? null,
  };
};

export type SpanMovePlan = {
  nextRaw: ScheduledTaskAPI[];
  taskIds: number[];
  previousTaskId: number | null;
  nextTaskId: number | null;
};

export const planSpanMove = (
  rawItems: ScheduledTaskAPI[],
  groupedItems: ScheduledGroupedItem[],
  activeWrapId: SortableId,
  prevItemId: SortableId | null,
): SpanMovePlan | null => {
  if (!isWrapSortableId(activeWrapId)) return null;
  const applicationId = parseWrapSortableId(activeWrapId);
  if (applicationId === null) return null;
  const wrap = findWrap(groupedItems, applicationId);
  if (!wrap) return null;

  const taskIds = wrap.absorbed_task_ids;
  const spanIds: ReadonlySet<number> = new Set(taskIds);
  const restDestIndex = computeRestDestIndex(
    rawItems,
    spanIds,
    prevItemId,
    groupedItems,
  );
  const nextRaw = arrayMoveSpan(rawItems, spanIds, restDestIndex);
  if (sameOrder(nextRaw, rawItems)) return null;

  return {
    nextRaw,
    taskIds,
    previousTaskId: nextRaw[restDestIndex - 1]?.id ?? null,
    nextTaskId: nextRaw[restDestIndex + taskIds.length]?.id ?? null,
  };
};
