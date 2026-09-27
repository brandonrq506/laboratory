import { SortableItemCardOverlay } from "@/components/core";

import { CARD_INDENT_CLASS } from "../constants/card-indent";

import type { ScheduledRenderItem } from "../types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "../types/scheduledTask";

interface Props {
  item: ScheduledRenderItem<ScheduledTaskAPI>;
  children: React.ReactNode;
}

export const ScheduledItemCardOverlay = ({ item, children }: Props) => (
  <SortableItemCardOverlay className={CARD_INDENT_CLASS[item.kind]}>
    {children}
  </SortableItemCardOverlay>
);
