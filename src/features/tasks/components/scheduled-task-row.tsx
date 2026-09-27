import { RoutineGroupContent } from "@/features/routines/components";
import { SortableItemCard } from "@/components/core";
import { TimerScheduledTaskContent } from "./timer-scheduled-task-content";

import { CARD_TYPE } from "../types/card-types";

import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-grouped-card";
import type { ScheduledTaskWithEST } from "@/features/tasks/types/scheduledTaskWithEST";

type Props = {
  item: ScheduledRenderItem<ScheduledTaskWithEST>;
  onToggleExpanded: (applicationId: number) => void;
};

export const ScheduledTaskRow = ({ item, onToggleExpanded }: Props) => {
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
            expanded={item.expanded}
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
