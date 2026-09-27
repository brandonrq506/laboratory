import { SortableItemCard } from "@/components/core";

import { CARD_INDENT_CLASS } from "../constants/card-indent";

import type { ScheduledRenderItem } from "../types/scheduled-grouped-card";
import type { ScheduledTaskAPI } from "../types/scheduledTask";

interface Props {
  item: ScheduledRenderItem<ScheduledTaskAPI>;
  children: React.ReactNode;
}

export const ScheduledItemCard = ({ item, children }: Props) => (
  <SortableItemCard itemId={item.id} className={CARD_INDENT_CLASS[item.kind]}>
    {children}
  </SortableItemCard>
);
