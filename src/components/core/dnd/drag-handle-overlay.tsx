import { Bars3Icon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core/Button/IconButton";

/**
 * Presentational twin of <DragHandle> for the drag-overlay clone. The overlay
 * is an inert snapshot that follows the cursor, so this handle carries no
 * sortable bindings and is hidden from assistive tech — it only mirrors the
 * handle's look in its "grabbed" state.
 */
export const DragHandleOverlay = () => {
  return (
    <IconButton aria-hidden tabIndex={-1} className="rounded-lg">
      <Bars3Icon className="size-5 cursor-grabbing text-gray-600" />
    </IconButton>
  );
};
