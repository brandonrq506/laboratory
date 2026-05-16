import {
  isWrapSortableId,
  parseWrapSortableId,
} from "@/features/routines/utils/wrap-sortable-id";
import { arrayMoveSpan } from "@/features/tasks/utils/array-move-span";

import type {
  ScheduledRenderItem,
  ScheduledVisibleItem,
  WrappedRoutineItem,
} from "@/features/tasks/types/scheduled-visible-item";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { UniqueIdentifier } from "@dnd-kit/core";

export type SortableId = UniqueIdentifier;

export const flattenWithExpansion = (
  visibleItems: ScheduledVisibleItem[],
  isExpanded: (applicationId: number) => boolean,
): ScheduledRenderItem[] => {
  const result: ScheduledRenderItem[] = [];
  for (const item of visibleItems) {
    if (item.kind === "task") {
      result.push(item);
      continue;
    }
    result.push(item);
    if (!isExpanded(item.routine_application_id)) continue;
    for (const task of item.absorbed_tasks) {
      result.push({
        kind: "expanded-child",
        id: task.id,
        task,
        parent_routine_application_id: item.routine_application_id,
      });
    }
  }
  return result;
};

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

export const findWrap = (
  visibleItems: ScheduledVisibleItem[],
  applicationId: number,
): WrappedRoutineItem | null => {
  for (const item of visibleItems) {
    if (item.kind === "wrap" && item.routine_application_id === applicationId) {
      return item;
    }
  }
  return null;
};

export const lookupAnchorRawId = (
  prevItemId: SortableId | null,
  visibleItems: ScheduledVisibleItem[],
): number | null => {
  if (prevItemId === null) return null;
  if (typeof prevItemId === "number") return prevItemId;
  const applicationId = parseWrapSortableId(prevItemId);
  if (applicationId === null) return null;
  const wrap = findWrap(visibleItems, applicationId);
  if (!wrap || wrap.absorbed_task_ids.length === 0) return null;
  return wrap.absorbed_task_ids[wrap.absorbed_task_ids.length - 1];
};

const computeRestDestIndex = (
  rawItems: ScheduledTaskAPI[],
  spanIds: ReadonlySet<number>,
  prevItemId: SortableId | null,
  visibleItems: ScheduledVisibleItem[],
): number => {
  const restAnchor = lookupAnchorRawId(prevItemId, visibleItems);
  if (restAnchor === null) return 0;
  const rest = rawItems.filter((t) => !spanIds.has(t.id));
  return rest.findIndex((t) => t.id === restAnchor) + 1;
};

export type SingleMovePlan = {
  nextRaw: ScheduledTaskAPI[];
  taskId: number;
  prevTaskId: number | null;
  nextTaskId: number | null;
};

export const planSingleMove = (
  rawItems: ScheduledTaskAPI[],
  visibleItems: ScheduledVisibleItem[],
  activeId: number,
  prevItemId: SortableId | null,
): SingleMovePlan | null => {
  const spanIds: ReadonlySet<number> = new Set([activeId]);
  const restDestIndex = computeRestDestIndex(
    rawItems,
    spanIds,
    prevItemId,
    visibleItems,
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
  visibleItems: ScheduledVisibleItem[],
  activeWrapId: SortableId,
  prevItemId: SortableId | null,
): SpanMovePlan | null => {
  if (!isWrapSortableId(activeWrapId)) return null;
  const applicationId = parseWrapSortableId(activeWrapId);
  if (applicationId === null) return null;
  const wrap = findWrap(visibleItems, applicationId);
  if (!wrap) return null;

  const taskIds = wrap.absorbed_task_ids;
  const spanIds: ReadonlySet<number> = new Set(taskIds);
  const restDestIndex = computeRestDestIndex(
    rawItems,
    spanIds,
    prevItemId,
    visibleItems,
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
