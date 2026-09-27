import { TimerRoutineGroupContent } from "@/features/routines/components";
import { TimerScheduledTaskContent } from "./timer-scheduled-task-content";

import { CARD_TYPE } from "../types/card-types";

import type { ScheduledRenderItem } from "../types/scheduled-grouped-card";
import type { ScheduledTaskWithEST } from "../types/scheduledTaskWithEST";

interface Props {
  item: ScheduledRenderItem<ScheduledTaskWithEST>;
  onToggleExpanded: (routineApplicationId: number) => void;
}

export const TimerScheduledCardContent = ({
  item,
  onToggleExpanded,
}: Props) => {
  switch (item.kind) {
    case CARD_TYPE.WRAP:
      return (
        <TimerRoutineGroupContent
          item={item}
          onToggleExpanded={onToggleExpanded}
        />
      );
    case CARD_TYPE.TASK:
    case CARD_TYPE.EXPANDED_CHILD:
      return <TimerScheduledTaskContent task={item.task} />;
    default:
      return item satisfies never;
  }
};
