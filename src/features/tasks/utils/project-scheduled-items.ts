import { CARD_TYPE } from "@/features/tasks/types/card-types";

import type {
  ScheduledGroupedItem,
  ScheduledRenderItem,
} from "@/features/tasks/types/scheduled-grouped-card";
import type { ExpandedGroupMap } from "@/features/tasks/types/expanded-group-map";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { SortableId } from "@/features/tasks/types/sortable-task-list";

/**
 * Flatten grouped items into render rows. A wrap is `expanded` when the user
 * expanded it AND it is not the card being dragged (a dragged wrap renders
 * collapsed). Only expanded wraps emit their absorbed tasks as child rows.
 */
export const projectScheduledItems = <T extends ScheduledTaskAPI>(
  groupedItems: readonly ScheduledGroupedItem<T>[],
  expansion: ExpandedGroupMap,
  draggingId: SortableId | null,
): ScheduledRenderItem<T>[] => {
  const result: ScheduledRenderItem<T>[] = [];
  for (const item of groupedItems) {
    if (item.kind === CARD_TYPE.TASK) {
      result.push(item);
      continue;
    }
    const expanded =
      expansion.has(item.routine_application_id) && draggingId !== item.id;
    result.push({ ...item, expanded });
    if (!expanded) continue;
    for (const task of item.absorbed_tasks) {
      result.push({ kind: CARD_TYPE.EXPANDED_CHILD, id: task.id, task });
    }
  }
  return result;
};
