import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core/Button/IconButton";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

interface Props {
  attributes: DraggableAttributes;
  listeners: SyntheticListenerMap | undefined;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
}

export const DragHandle = ({
  attributes,
  listeners,
  setActivatorNodeRef,
}: Props) => {
  return (
    <IconButton
      {...attributes}
      {...listeners}
      ref={setActivatorNodeRef}
      style={{ touchAction: "none" }}>
      <AdjustmentsHorizontalIcon className="size-5 cursor-grab text-gray-400 hover:text-gray-600" />
      <span className="sr-only">Drag handle</span>
    </IconButton>
  );
};
