import { CardShell } from "./card-shell";
import { DragHandleOverlay } from "./drag-handle-overlay";

/**
 * Presentational twin of <SortableItemCard> rendered inside dnd-kit's
 * <DragOverlay> — the lifted clone that follows the cursor. It carries no
 * sortable bindings (no useSortable, no itemId) and shows the "picked up"
 * styling.
 *
 * `inert` makes the clone a visual snapshot: hidden from assistive tech and
 * never focusable or clickable. So a row's content (links, buttons) can render
 * here unchanged without duplicating the live row's controls.
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
  <div inert>
    <CardShell
      className={className}
      shadowStyle={shadowStyle}
      cardClassName="z-20 border border-accent-strong shadow-2xl"
      handle={<DragHandleOverlay />}>
      {children}
    </CardShell>
  </div>
);
