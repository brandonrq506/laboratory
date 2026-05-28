import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { futureTasksQueryOptions } from "@/features/tasks/api/queries";
import { planSingleMove } from "@/features/tasks/utils/plan-move";
import { useFutureMoveTask } from "@/features/tasks/api/tanstack/use-move-future-task";

import type {
  OnDragEndArgs,
  SortableId,
} from "@/features/tasks/types/sortable-task-list";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const EMPTY: ScheduledTaskAPI[] = [];

export const useFutureScheduledTasksSorting = (date: string) => {
  const queryResult = useQuery(futureTasksQueryOptions(date));
  const moveMutation = useFutureMoveTask(date);

  const [tempItems, setTempItems] = useState<ScheduledTaskAPI[] | null>(null);
  const [draggingId, setDraggingId] = useState<SortableId | null>(null);

  const rawItems: ScheduledTaskAPI[] = tempItems ?? queryResult.data ?? EMPTY;

  const handleDragStart = useCallback(
    (id: SortableId) => setDraggingId(id),
    [],
  );
  const handleDragCancel = useCallback(() => setDraggingId(null), []);

  const handleDragEnd = useCallback(
    async ({ itemId, prevItemId }: OnDragEndArgs<ScheduledTaskAPI>) => {
      setDraggingId(null);
      if (typeof itemId !== "number") return;
      const plan = planSingleMove(rawItems, [], itemId, prevItemId);
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
