import { useMoveTask } from "@/features/tasks/api/tanstack/useMoveTask";
import { useMoveTasks } from "@/features/tasks/api/tanstack/use-move-tasks";

import { planSingleMove, planSpanMove } from "@/features/tasks/utils/plan-move";
import { isWrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import type {
  ScheduledListSource,
  SetTempItems,
} from "@/features/tasks/types/scheduled-list-source";
import type { ScheduledGroupedItem } from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { SortableId } from "@/features/tasks/types/sortable-task-list";

interface Args {
  /** The writable half of the list: never `displayTasks`, so derived fields can't reach the cache. */
  source: Pick<
    ScheduledListSource<ScheduledTaskAPI>,
    "listQueryOptions" | "rawItems" | "setTempItems"
  >;
  groupedItems: readonly ScheduledGroupedItem<ScheduledTaskAPI>[];
}

const runOptimistic = async <T>(
  setTempItems: SetTempItems,
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

export const useScheduledMutationOps = ({ source, groupedItems }: Args) => {
  const { listQueryOptions, rawItems, setTempItems } = source;
  const { mutateAsync: moveTask } = useMoveTask(listQueryOptions);
  const { mutateAsync: moveTasks } = useMoveTasks(listQueryOptions);

  const performMove = async (
    activeId: SortableId,
    prevItemId: SortableId | null,
  ) => {
    if (isWrapSortableId(activeId)) {
      const plan = planSpanMove(rawItems, groupedItems, activeId, prevItemId);
      if (!plan) return;
      await runOptimistic(setTempItems, plan.nextRaw, moveTasks, {
        task_ids: plan.taskIds,
        previous_task_id: plan.previousTaskId,
        next_task_id: plan.nextTaskId,
        tasks: plan.nextRaw,
      });
      return;
    }
    const plan = planSingleMove(
      rawItems,
      groupedItems,
      activeId as number,
      prevItemId,
    );
    if (!plan) return;
    await runOptimistic(setTempItems, plan.nextRaw, moveTask, {
      taskId: plan.taskId,
      prevTaskId: plan.prevTaskId,
      nextTaskId: plan.nextTaskId,
      tasks: plan.nextRaw,
    });
  };

  return { performMove };
};
