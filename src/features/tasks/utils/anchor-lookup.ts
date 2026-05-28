import { CARD_TYPE } from "@/features/tasks/types/card-types";
import { parseWrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import type {
  ScheduledGroupedItem,
  WrappedRoutineCard,
} from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { SortableId } from "@/features/tasks/types/sortable-task-list";

export const findWrap = (
  groupedItems: ScheduledGroupedItem[],
  applicationId: number,
): WrappedRoutineCard | null => {
  for (const item of groupedItems) {
    if (
      item.kind === CARD_TYPE.WRAP &&
      item.routine_application_id === applicationId
    ) {
      return item;
    }
  }
  return null;
};

export const lookupAnchorRawId = (
  prevItemId: SortableId | null,
  groupedItems: ScheduledGroupedItem[],
): number | null => {
  if (prevItemId === null) return null;
  if (typeof prevItemId === "number") return prevItemId;
  const applicationId = parseWrapSortableId(prevItemId);
  if (applicationId === null) return null;
  const wrap = findWrap(groupedItems, applicationId);
  if (!wrap || wrap.absorbed_task_ids.length === 0) return null;
  return wrap.absorbed_task_ids[wrap.absorbed_task_ids.length - 1];
};

export const computeRestDestIndex = (
  rawItems: ScheduledTaskAPI[],
  spanIds: ReadonlySet<number>,
  prevItemId: SortableId | null,
  groupedItems: ScheduledGroupedItem[],
): number => {
  const restAnchor = lookupAnchorRawId(prevItemId, groupedItems);
  if (restAnchor === null) return 0;
  const rest = rawItems.filter((t) => !spanIds.has(t.id));
  return rest.findIndex((t) => t.id === restAnchor) + 1;
};
