import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/layout";
import { DragHandle } from "./drag-handle";

import clsx from "clsx";

type Props = {
  itemId: number;
  children: React.ReactNode;
  shadowStyle?: string;
};

export const SortableItemCard = ({
  itemId,
  children,
  shadowStyle = "shadow-xs",
}: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card
        className={clsx(
          "flex justify-between transition-transform duration-100",
          isDragging && ["z-20 scale-105 border border-indigo-700 shadow-2xl"],
          shadowStyle,
        )}>
        <div className="flex grow items-center gap-2">
          <DragHandle
            attributes={attributes}
            listeners={listeners}
            setActivatorNodeRef={setActivatorNodeRef}
          />
          {children}
        </div>
      </Card>
    </div>
  );
};
