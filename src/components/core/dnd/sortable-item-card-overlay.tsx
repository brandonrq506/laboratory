import { CardShell } from "./card-shell";
import { DragHandleOverlay } from "./drag-handle-overlay";

/**
 * Presentational twin of <SortableItemCard> rendered inside dnd-kit's
 * <DragOverlay> — the lifted clone that follows the cursor. It carries no
 * sortable bindings (no useSortable, no itemId) and shows the "picked up"
 * styling.
 */

type Props = {
  children: React.ReactNode;
  shadowStyle?: string;
  className?: string;
};

export const SortableItemCardOverlay = ({
  children,
  shadowStyle = "shadow-xs",
  className,
}: Props) => (
  <CardShell
    className={className}
    shadowStyle={shadowStyle}
    cardClassName="z-20 border border-indigo-700 shadow-2xl"
    handle={<DragHandleOverlay />}>
    {children}
  </CardShell>
);
