import { useCallback, useState } from "react";

import type {
  OnDragEndArgs,
  SortableId,
} from "@/features/tasks/types/sortable-task-list";
import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-grouped-card";

type Args = {
  performMove: (
    activeId: SortableId,
    prevItemId: SortableId | null,
  ) => Promise<void>;
};

export const useScheduledDragHandlers = ({ performMove }: Args) => {
  const [draggingId, setDraggingId] = useState<SortableId | null>(null);

  const handleDragStart = useCallback(
    (id: SortableId) => setDraggingId(id),
    [],
  );
  const handleDragCancel = useCallback(() => setDraggingId(null), []);

  const handleDragEnd = useCallback(
    ({ itemId, prevItemId }: OnDragEndArgs<ScheduledRenderItem>) => {
      setDraggingId(null);
      void performMove(itemId, prevItemId);
    },
    [performMove],
  );

  return { draggingId, handleDragStart, handleDragEnd, handleDragCancel };
};
