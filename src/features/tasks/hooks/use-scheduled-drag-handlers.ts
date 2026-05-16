import { useCallback, useState } from "react";

import { isWrapSortableId } from "@/features/routines/utils/wrap-sortable-id";

import type { OnDragEndArgs } from "@/features/tasks/types/sortable-task-list";
import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-visible-item";
import type { SortableId } from "./scheduled-sorting-internals";

type Args = {
  performSingleMove: (
    activeId: number,
    prevItemId: SortableId | null,
  ) => Promise<void>;
  performSpanMove: (
    activeWrapId: SortableId,
    prevItemId: SortableId | null,
  ) => Promise<void>;
};

export const useScheduledDragHandlers = ({
  performSingleMove,
  performSpanMove,
}: Args) => {
  const [draggingId, setDraggingId] = useState<SortableId | null>(null);

  const handleDragStart = useCallback(
    (id: SortableId) => setDraggingId(id),
    [],
  );
  const handleDragCancel = useCallback(() => setDraggingId(null), []);

  const handleDragEnd = useCallback(
    ({ itemId, prevItemId }: OnDragEndArgs<ScheduledRenderItem>) => {
      setDraggingId(null);
      if (isWrapSortableId(itemId)) {
        void performSpanMove(itemId, prevItemId);
        return;
      }
      void performSingleMove(itemId as number, prevItemId);
    },
    [performSingleMove, performSpanMove],
  );

  return { draggingId, handleDragStart, handleDragEnd, handleDragCancel };
};
