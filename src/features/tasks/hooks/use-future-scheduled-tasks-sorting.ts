import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { arrayMoveSpan } from "@/features/tasks/utils/array-move-span";
import { futureTasksQueryOptions } from "@/features/tasks/api/queries";
import { useFutureMoveTask } from "@/features/tasks/api/tanstack/use-move-future-task";

import type { OnDragEndArgs } from "@/features/tasks/types/sortable-task-list";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { UniqueIdentifier } from "@dnd-kit/core";

type SortableId = UniqueIdentifier;

const sameOrder = (a: ScheduledTaskAPI[], b: ScheduledTaskAPI[]): boolean => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id) return false;
  }
  return true;
};

const planMove = (
  rawItems: ScheduledTaskAPI[],
  itemId: number,
  prevItemId: SortableId | null,
) => {
  const spanIds: ReadonlySet<number> = new Set([itemId]);
  const rest = rawItems.filter((t) => !spanIds.has(t.id));
  const restDestIndex =
    typeof prevItemId === "number"
      ? rest.findIndex((t) => t.id === prevItemId) + 1
      : 0;

  const nextRaw = arrayMoveSpan(rawItems, spanIds, restDestIndex);
  if (sameOrder(nextRaw, rawItems)) return null;

  const taskIndex = nextRaw.findIndex((t) => t.id === itemId);
  return {
    nextRaw,
    prevTaskId: nextRaw[taskIndex - 1]?.id ?? null,
    nextTaskId: nextRaw[taskIndex + 1]?.id ?? null,
  };
};

export const useFutureScheduledTasksSorting = (date: string) => {
  const queryResult = useQuery(futureTasksQueryOptions(date));
  const moveMutation = useFutureMoveTask(date);

  const [tempItems, setTempItems] = useState<ScheduledTaskAPI[] | null>(null);
  const [draggingId, setDraggingId] = useState<SortableId | null>(null);

  const rawItems = useMemo<ScheduledTaskAPI[]>(
    () => tempItems ?? queryResult.data ?? [],
    [tempItems, queryResult.data],
  );

  const handleDragStart = useCallback(
    (id: SortableId) => setDraggingId(id),
    [],
  );
  const handleDragCancel = useCallback(() => setDraggingId(null), []);

  const handleDragEnd = useCallback(
    async ({ itemId, prevItemId }: OnDragEndArgs<ScheduledTaskAPI>) => {
      setDraggingId(null);
      if (typeof itemId !== "number") return;
      const plan = planMove(rawItems, itemId, prevItemId);
      if (!plan) return;
      setTempItems(plan.nextRaw);
      try {
        await moveMutation.mutateAsync({
          taskId: itemId,
          prevTaskId: plan.prevTaskId,
          nextTaskId: plan.nextTaskId,
          tasks: plan.nextRaw,
        });
      } catch {
        /* rollback handled inside mutation onError */
      } finally {
        setTempItems(null);
      }
    },
    [rawItems, moveMutation],
  );

  return {
    isPending: queryResult.isPending,
    isError: queryResult.isError,
    refetch: queryResult.refetch,
    hasTasks: rawItems.length > 0,
    renderItems: rawItems,
    draggingId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
