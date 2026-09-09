import { Bars3Icon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core/Button/IconButton";

import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface Props {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
  isHidden?: boolean;
}

export const DragHandle = ({
  attributes,
  listeners,
  setActivatorNodeRef,
  isHidden = false,
}: Props) => {
  return (
    <IconButton
      {...attributes}
      {...listeners}
      ref={setActivatorNodeRef}
      style={{
        touchAction: "none",
        visibility: isHidden ? "hidden" : "visible",
      }}
      className="group hover:bg-surface-hover/80 rounded-lg transition-colors">
      <Bars3Icon className="text-foreground-faint group-hover:text-foreground-muted size-5 cursor-grab transition-all duration-200 group-active:cursor-grabbing" />
      <span className="sr-only">Drag handle</span>
    </IconButton>
  );
};
