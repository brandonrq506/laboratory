import { useSortable } from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import clsx from "clsx";

import { CardShell } from "./card-shell";
import { DragHandle } from "./drag-handle";

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
};

export const SortableItemCard = ({
  itemId,
  children,
  shadowStyle = "shadow-xs",
  className,
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
    <CardShell
      outerRef={setNodeRef}
      style={style}
      className={className}
      shadowStyle={shadowStyle}
      cardClassName={clsx(
        "transition-transform duration-100",
        isDragging && "opacity-40",
      )}
      handle={
        <DragHandle
          attributes={attributes}
          listeners={listeners}
          setActivatorNodeRef={setActivatorNodeRef}
          isHidden={isDragging}
        />
      }>
      {children}
    </CardShell>
  );
};
