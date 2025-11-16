import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { useMoveActivityRoutine } from "../api/tanstack/useMoveActivityRoutine";

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

import type { RoutineItemWithExpectedStartTime } from "../types/routine-with-expected-time";
import { SortableRoutineActivity } from "./SortableRoutineActivity";

type Props = {
  routineId: number;
  items: RoutineItemWithExpectedStartTime[];
};

export const SortableRoutineActivityList = ({ routineId, items }: Props) => {
  const { mutate: moveActivity } = useMoveActivityRoutine();
  const [sortedItems, setSortedItems] =
    useState<RoutineItemWithExpectedStartTime[]>(items);

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    if (active.id === over.id) return;

    const oldIndex = sortedItems.findIndex((a) => a.id === active.id);
    const newIndex = sortedItems.findIndex((a) => a.id === over.id);

    const newItems = arrayMove(sortedItems, oldIndex, newIndex);
    setSortedItems(newItems);

    const destination = over.data as {
      current: { sortable: { index: number } };
    };

    moveActivity({
      routine_id: routineId,
      routine_item_id: active.id as number,
      new_position: destination.current.sortable.index,
      routine_items: newItems,
    });
  };

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        <SortableContext
          items={sortedItems.map((a) => a.id)}
          strategy={verticalListSortingStrategy}>
          {sortedItems.map((item) => (
            <SortableRoutineActivity
              key={item.id}
              routineId={routineId}
              item={item}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
