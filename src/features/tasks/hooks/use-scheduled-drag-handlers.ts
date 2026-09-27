import { useState } from "react";

import type {
  OnDragEndArgs,
  SortableId,
} from "@/features/tasks/types/sortable-task-list";
import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

interface Args {
  performMove: (
    activeId: SortableId,
    prevItemId: SortableId | null,
  ) => Promise<void>;
}

export const useScheduledDragHandlers = ({ performMove }: Args) => {
  const [draggingId, setDraggingId] = useState<SortableId | null>(null);

  const handleDragStart = (id: SortableId) => setDraggingId(id);
  const handleDragCancel = () => setDraggingId(null);

  const handleDragEnd = ({
    itemId,
    prevItemId,
  }: OnDragEndArgs<ScheduledRenderItem<ScheduledTaskAPI>>) => {
    setDraggingId(null);
    void performMove(itemId, prevItemId);
  };

  return { draggingId, handleDragStart, handleDragEnd, handleDragCancel };
};
