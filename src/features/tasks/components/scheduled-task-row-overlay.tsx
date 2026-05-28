import { RoutineGroupContent } from "@/features/routines/components";
import { SortableItemCardOverlay } from "@/components/core";
import { TimerScheduledTaskContent } from "./timer-scheduled-task-content";

import { CARD_TYPE } from "../types/card-types";

import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-grouped-card";

type Props = {
  item: ScheduledRenderItem;
};

export const ScheduledTaskRowOverlay = ({ item }: Props) => {
  switch (item.kind) {
    case CARD_TYPE.TASK:
      return (
        <SortableItemCardOverlay>
          <TimerScheduledTaskContent task={item.task} />
        </SortableItemCardOverlay>
      );
    case CARD_TYPE.WRAP:
      return (
        <SortableItemCardOverlay>
          <RoutineGroupContent item={item} />
        </SortableItemCardOverlay>
      );
    case CARD_TYPE.EXPANDED_CHILD:
      return (
        <SortableItemCardOverlay className="ml-4">
          <TimerScheduledTaskContent task={item.task} />
        </SortableItemCardOverlay>
      );
    default:
      return null;
  }
};
