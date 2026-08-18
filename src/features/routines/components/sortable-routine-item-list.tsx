import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { startTransition, useOptimistic } from "react";
import { useMoveRoutineItem } from "../api/tanstack/use-move-routine-item";

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
import { RoutineItemContent } from "./routine-item-content";
import { SortableItemCard } from "@/components/core";

import type { RoutineItemWithExpectedStartTime } from "../types/routine-with-expected-time";

type Props = {
  routineId: number;
  items: RoutineItemWithExpectedStartTime[];
};

// TODO: Make this component adopt the sortable API used by tasks. (Then we reuse SortableTaskList)
export const SortableRoutineItemList = ({ routineId, items }: Props) => {
  const { mutateAsync: moveActivity } = useMoveRoutineItem();
  const [optimisticItems, setOptimisticItems] = useOptimistic(items);

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

    const oldIndex = optimisticItems.findIndex((item) => item.id === active.id);
    const newIndex = optimisticItems.findIndex((item) => item.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const newItems = arrayMove(optimisticItems, oldIndex, newIndex);

    startTransition(async () => {
      setOptimisticItems(newItems);
      await moveActivity({
        routine_id: routineId,
        routine_item_id: active.id as number,
        new_position: newIndex,
        routine_items: newItems,
      }).catch(() => undefined);
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
          items={optimisticItems.map((item) => item.id)}
          strategy={verticalListSortingStrategy}>
          {optimisticItems.map((item) => (
            <SortableItemCard
              key={item.id}
              itemId={item.id}
              shadowStyle="shadow-2xs">
              <RoutineItemContent routineId={routineId} item={item} />
            </SortableItemCard>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
