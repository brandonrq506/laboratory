import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import {
  isWrapSortableId,
  parseWrapSortableId,
} from "@/features/routines/utils/wrap-sortable-id";
import { calculateExpectedStartTimes } from "@/features/tasks/utils/calculateExpectedStartTimes";
import { flattenWithExpansion } from "./scheduled-sorting-internals";
import { groupRoutineTasks } from "@/features/tasks/utils/group-routine-tasks";
import { useExpansionMap } from "./use-expansion-map";
import { useScheduledDragHandlers } from "./use-scheduled-drag-handlers";
import { useScheduledMutationOps } from "./use-scheduled-mutation-ops";

import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-visible-item";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { UniqueIdentifier } from "@dnd-kit/core";

const dropDraggingWrapChildren = (
  flat: ScheduledRenderItem[],
  draggingId: UniqueIdentifier | null,
): ScheduledRenderItem[] => {
  if (!draggingId || !isWrapSortableId(draggingId)) return flat;
  const draggingApplicationId = parseWrapSortableId(draggingId);
  if (draggingApplicationId === null) return flat;
  return flat.filter(
    (item) =>
      !(
        item.kind === "expanded-child" &&
        item.parent_routine_application_id === draggingApplicationId
      ),
  );
};

export const useScheduledTasksSorting = () => {
  const queryResult = useQuery(scheduledTasksQueryOptions());
  const { data: inProgressData } = useQuery(inProgressTasksQueryOptions());

  const [tempItems, setTempItems] = useState<ScheduledTaskAPI[] | null>(null);
  const [expansionByApplicationId, toggleExpanded] = useExpansionMap();

  const rawItems = useMemo<ScheduledTaskAPI[]>(
    () => tempItems ?? queryResult.data ?? [],
    [tempItems, queryResult.data],
  );
  const visibleItems = useMemo(
    () =>
      groupRoutineTasks(
        calculateExpectedStartTimes(rawItems, inProgressData?.[0]),
      ),
    [rawItems, inProgressData],
  );

  const { performSingleMove, performSpanMove, bulkDeleteAbsorbed } =
    useScheduledMutationOps({
      rawItems,
      visibleItems,
      setTempItems,
      patchTempItems: setTempItems,
    });

  const { draggingId, handleDragStart, handleDragEnd, handleDragCancel } =
    useScheduledDragHandlers({ performSingleMove, performSpanMove });

  const renderItems = useMemo(
    () =>
      dropDraggingWrapChildren(
        flattenWithExpansion(visibleItems, (applicationId: number) =>
          expansionByApplicationId.has(applicationId),
        ),
        draggingId,
      ),
    [visibleItems, expansionByApplicationId, draggingId],
  );

  return {
    isPending: queryResult.isPending,
    isError: queryResult.isError,
    refetch: queryResult.refetch,
    hasTasks: rawItems.length > 0,
    renderItems,
    draggingId,
    expansionByApplicationId,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    toggleExpanded,
    bulkDeleteAbsorbed,
  };
};
