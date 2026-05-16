import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/layout";
import { DragHandle } from "./drag-handle";

import clsx from "clsx";

/*
  Why `itemId` supports both string and number?
  If a wrapper for routine_application_id = 42 shared the integer 42 with a task of id = 42, they'd
  collide. To ensure this never occurs, we support `wrap:${appId}` as a synthetic id for routine applications.

*/

type Props = {
  itemId: string | number;
  children: React.ReactNode;
  shadowStyle?: string;
  className?: string;
  isOverlay?: boolean;
};

const SortableItemCardInner = ({
  itemId,
  children,
  shadowStyle,
  className,
}: Required<Pick<Props, "itemId" | "children" | "shadowStyle">> &
  Pick<Props, "className">) => {
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
    <div ref={setNodeRef} style={style} className={clsx("relative", className)}>
      <Card
        className={clsx(
          "flex justify-between transition-transform duration-100",
          shadowStyle,
          isDragging && "opacity-40",
        )}>
        <div className="flex grow items-center gap-2">
          <DragHandle
            attributes={attributes}
            listeners={listeners}
            setActivatorNodeRef={setActivatorNodeRef}
            isHidden={isDragging}
          />
          {children}
        </div>
      </Card>
    </div>
  );
};

export const SortableItemCard = ({
  itemId,
  children,
  shadowStyle = "shadow-xs",
  className,
  isOverlay = false,
}: Props) => {
  if (isOverlay) {
    return (
      <div className={clsx("relative", className)}>
        <Card
          className={clsx(
            "flex justify-between",
            shadowStyle,
            "z-20 scale-105 border border-indigo-700 shadow-2xl",
          )}>
          <div className="flex grow items-center gap-2">
            <DragHandle />
            {children}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <SortableItemCardInner
      itemId={itemId}
      shadowStyle={shadowStyle}
      className={className}>
      {children}
    </SortableItemCardInner>
  );
};
