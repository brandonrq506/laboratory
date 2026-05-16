import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Fragment, useState } from "react";

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { TaskEmptyList } from "./TaskEmptyList";

import type {
  SortableListItem,
  SortableTaskListProps,
} from "../types/sortable-task-list";

export const SortableTaskList = <T extends SortableListItem>({
  items,
  renderItem,
  renderOverlay,
  onDragStart,
  onDragEnd,
  onDragCancel,
}: SortableTaskListProps<T>) => {
  const [activeId, setActiveId] = useState<T["id"] | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      // Add a small delay to prevent accidental drags
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as T["id"]);
    onDragStart?.(event.active.id as T["id"]);
  };

  const handleDragCancel = (event: DragCancelEvent) => {
    setActiveId(null);
    onDragCancel?.(event.active.id as T["id"]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) {
      onDragCancel?.(active.id as T["id"]);
      return;
    }
    if (active.id === over.id) {
      onDragCancel?.(active.id as T["id"]);
      return;
    }

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      onDragCancel?.(active.id as T["id"]);
      return;
    }

    const newItems = arrayMove(items, oldIndex, newIndex);

    const prevItemId = newItems[newIndex - 1]?.id ?? null;
    const nextItemId = newItems[newIndex + 1]?.id ?? null;

    onDragEnd({
      itemId: active.id as T["id"],
      prevItemId,
      nextItemId,
      items: newItems,
    });
  };

  if (items.length === 0) return <TaskEmptyList />;

  const activeItem =
    activeId === null ? null : items.find((item) => item.id === activeId);

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <Fragment key={item.id}>{renderItem(item)}</Fragment>
          ))}
        </SortableContext>
        <DragOverlay>
          {!activeItem || !renderOverlay ? null : renderOverlay(activeItem)}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
