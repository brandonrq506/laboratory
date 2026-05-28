import {
  isWrapSortableId,
  parseWrapSortableId,
} from "@/features/routines/utils/wrap-sortable-id";
import { CARD_TYPE } from "@/features/tasks/types/card-types";

import type {
  ScheduledGroupedItem,
  ScheduledRenderItem,
} from "@/features/tasks/types/scheduled-grouped-card";
import type { SortableId } from "@/features/tasks/types/sortable-task-list";

const flattenWithExpansion = (
  groupedItems: ScheduledGroupedItem[],
  isExpanded: (applicationId: number) => boolean,
): ScheduledRenderItem[] => {
  const result: ScheduledRenderItem[] = [];
  for (const item of groupedItems) {
    if (item.kind === CARD_TYPE.TASK) {
      result.push(item);
      continue;
    }
    result.push(item);
    if (!isExpanded(item.routine_application_id)) continue;
    for (const task of item.absorbed_tasks) {
      result.push({
        kind: CARD_TYPE.EXPANDED_CHILD,
        id: task.id,
        task,
        parent_routine_application_id: item.routine_application_id,
      });
    }
  }
  return result;
};

const dropDraggingWrapChildren = (
  flat: ScheduledRenderItem[],
  draggingId: SortableId | null,
): ScheduledRenderItem[] => {
  if (!draggingId || !isWrapSortableId(draggingId)) return flat;
  const draggingApplicationId = parseWrapSortableId(draggingId);
  if (draggingApplicationId === null) return flat;
  return flat.filter(
    (item) =>
      !(
        item.kind === CARD_TYPE.EXPANDED_CHILD &&
        item.parent_routine_application_id === draggingApplicationId
      ),
  );
};

export const projectScheduledItems = (
  groupedItems: ScheduledGroupedItem[],
  expansionByApplicationId: ReadonlyMap<number, true>,
  draggingId: SortableId | null,
): ScheduledRenderItem[] => {
  const flat = flattenWithExpansion(groupedItems, (applicationId) =>
    expansionByApplicationId.has(applicationId),
  );
  return dropDraggingWrapChildren(flat, draggingId);
};
