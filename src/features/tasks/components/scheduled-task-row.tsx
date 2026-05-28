import { RoutineGroupContent } from "@/features/routines/components";
import { SortableItemCard } from "@/components/core";
import { TimerScheduledTaskContent } from "./timer-scheduled-task-content";

import { CARD_TYPE } from "../types/card-types";

import type { ExpandedGroupMap } from "../types/expanded-group-map";
import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-grouped-card";
import type { SortableId } from "@/features/tasks/types/sortable-task-list";

type Props = {
  item: ScheduledRenderItem;
  expandedGroups: ExpandedGroupMap;
  draggingId: SortableId | null;
  onToggleExpanded: (applicationId: number) => void;
};

export const ScheduledTaskRow = ({
  item,
  expandedGroups,
  draggingId,
  onToggleExpanded,
}: Props) => {
  switch (item.kind) {
    case CARD_TYPE.TASK:
      return (
        <SortableItemCard itemId={item.id}>
          <TimerScheduledTaskContent task={item.task} />
        </SortableItemCard>
      );
    case CARD_TYPE.WRAP:
      return (
        <SortableItemCard itemId={item.id}>
          <RoutineGroupContent
            item={item}
            expanded={
              expandedGroups.has(item.routine_application_id) &&
              draggingId !== item.id
            }
            onToggleExpanded={onToggleExpanded}
          />
        </SortableItemCard>
      );
    case CARD_TYPE.EXPANDED_CHILD:
      return (
        <SortableItemCard itemId={item.id} className="ml-4">
          <TimerScheduledTaskContent task={item.task} />
        </SortableItemCard>
      );
    default:
      return null;
  }
};
