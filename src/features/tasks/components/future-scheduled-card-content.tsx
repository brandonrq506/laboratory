import { FutureRoutineGroupContent } from "@/features/routines/components";
import { FutureScheduledTaskContent } from "./future-scheduled-task-content";

import { CARD_TYPE } from "../types/card-types";

import type { ScheduledRenderItem } from "../types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "../types/scheduledTask";

interface Props {
  item: ScheduledRenderItem<ScheduledTaskAPI>;
  onToggleExpanded: (routineApplicationId: number) => void;
}

export const FutureScheduledCardContent = ({
  item,
  onToggleExpanded,
}: Props) => {
  switch (item.kind) {
    case CARD_TYPE.WRAP:
      return (
        <FutureRoutineGroupContent
          item={item}
          onToggleExpanded={onToggleExpanded}
        />
      );
    case CARD_TYPE.TASK:
    case CARD_TYPE.EXPANDED_CHILD:
      return <FutureScheduledTaskContent task={item.task} />;
    default:
      return item satisfies never;
  }
};
