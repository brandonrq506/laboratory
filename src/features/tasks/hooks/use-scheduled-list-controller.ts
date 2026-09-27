import { groupRoutineTasks } from "@/features/tasks/utils/group-routine-tasks";
import { projectScheduledItems } from "@/features/tasks/utils/project-scheduled-items";
import { useExpansionMap } from "@/features/tasks/hooks/use-expansion-map";
import { useScheduledDragHandlers } from "@/features/tasks/hooks/use-scheduled-drag-handlers";
import { useScheduledMutationOps } from "@/features/tasks/hooks/use-scheduled-mutation-ops";

import type { ScheduledListSource } from "@/features/tasks/types/scheduled-list-source";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

/**
 * Wires one sortable scheduled list: routine grouping, expansion, drag state,
 * and optimistic moves, projected into render rows.
 *
 * Invariant: `source.rawItems` and `source.displayTasks` are the same list in
 * the same order. Grouping and rows read `displayTasks`; moves plan against
 * `rawItems`, and only `rawItems` is ever written to the cache.
 */
export const useScheduledListController = <T extends ScheduledTaskAPI>(
  source: ScheduledListSource<T>,
) => {
  const [expansion, toggleExpanded] = useExpansionMap();
  const groupedItems = groupRoutineTasks(source.displayTasks);
  const { performMove } = useScheduledMutationOps({ source, groupedItems });
  const { draggingId, handleDragStart, handleDragEnd, handleDragCancel } =
    useScheduledDragHandlers({ performMove });
  const items = projectScheduledItems(groupedItems, expansion, draggingId);

  return {
    items,
    toggleExpanded,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};
