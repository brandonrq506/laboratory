import { useCallback } from "react";

import {
  type SortableId,
  planSingleMove,
  planSpanMove,
} from "./scheduled-sorting-internals";
import { useBulkDeleteTasks } from "@/features/routines/api/tanstack/use-bulk-delete-tasks";
import { useMoveTask } from "@/features/tasks/api/tanstack/useMoveTask";
import { useMoveTaskSpan } from "@/features/routines/api/tanstack/use-move-task-span";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { ScheduledVisibleItem } from "@/features/tasks/types/scheduled-visible-item";

type Args = {
  rawItems: ScheduledTaskAPI[];
  visibleItems: ScheduledVisibleItem[];
  setTempItems: (next: ScheduledTaskAPI[] | null) => void;
  patchTempItems: (
    updater: (prev: ScheduledTaskAPI[] | null) => ScheduledTaskAPI[] | null,
  ) => void;
};

const runShockAbsorbed = async <T>(
  setTempItems: (next: ScheduledTaskAPI[] | null) => void,
  nextRaw: ScheduledTaskAPI[],
  mutate: (payload: T) => Promise<unknown>,
  payload: T,
): Promise<void> => {
  setTempItems(nextRaw);
  try {
    await mutate(payload);
  } catch {
    /* rollback handled inside mutation onError */
  } finally {
    setTempItems(null);
  }
};

export const useScheduledMutationOps = ({
  rawItems,
  visibleItems,
  setTempItems,
  patchTempItems,
}: Args) => {
  const moveTask = useMoveTask().mutateAsync;
  const moveTaskSpan = useMoveTaskSpan().mutateAsync;
  const bulkDelete = useBulkDeleteTasks().mutate;

  const performSingleMove = useCallback(
    async (activeId: number, prevItemId: SortableId | null) => {
      const plan = planSingleMove(rawItems, visibleItems, activeId, prevItemId);
      if (!plan) return;
      await runShockAbsorbed(setTempItems, plan.nextRaw, moveTask, {
        taskId: plan.taskId,
        prevTaskId: plan.prevTaskId,
        nextTaskId: plan.nextTaskId,
        tasks: plan.nextRaw,
      });
    },
    [rawItems, visibleItems, setTempItems, moveTask],
  );

  const performSpanMove = useCallback(
    async (activeWrapId: SortableId, prevItemId: SortableId | null) => {
      const plan = planSpanMove(
        rawItems,
        visibleItems,
        activeWrapId,
        prevItemId,
      );
      if (!plan) return;
      await runShockAbsorbed(setTempItems, plan.nextRaw, moveTaskSpan, {
        task_ids: plan.taskIds,
        previous_task_id: plan.previousTaskId,
        next_task_id: plan.nextTaskId,
        tasks: plan.nextRaw,
      });
    },
    [rawItems, visibleItems, setTempItems, moveTaskSpan],
  );

  const bulkDeleteAbsorbed = useCallback(
    (taskIds: number[]) => {
      patchTempItems((prev) =>
        prev === null ? prev : prev.filter((t) => !taskIds.includes(t.id)),
      );
      bulkDelete({ task_ids: taskIds });
    },
    [patchTempItems, bulkDelete],
  );

  return { performSingleMove, performSpanMove, bulkDeleteAbsorbed };
};
