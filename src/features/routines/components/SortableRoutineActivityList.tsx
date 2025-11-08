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

import type { RoutineActivityWithExpectedStartTime } from "../types/routine-with-expected-time";
import { SortableRoutineActivity } from "./SortableRoutineActivity";

type Props = {
  routineId: number;
  activities: RoutineActivityWithExpectedStartTime[];
};

export const SortableRoutineActivityList = ({
  routineId,
  activities,
}: Props) => {
  const { mutate: moveActivity } = useMoveActivityRoutine();
  const [sortedActivities, setSortedActivities] =
    useState<RoutineActivityWithExpectedStartTime[]>(activities);

  useEffect(() => {
    setSortedActivities(activities);
  }, [activities]);

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

    const oldIndex = sortedActivities.findIndex((a) => a.id === active.id);
    const newIndex = sortedActivities.findIndex((a) => a.id === over.id);

    const newActivities = arrayMove(sortedActivities, oldIndex, newIndex);
    setSortedActivities(newActivities);

    const destination = over.data as {
      current: { sortable: { index: number } };
    };

    moveActivity({
      routine_id: routineId,
      activity_routine_id: active.id as number,
      new_position: destination.current.sortable.index,
      activities: newActivities,
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
          items={sortedActivities.map((a) => a.id)}
          strategy={verticalListSortingStrategy}>
          {sortedActivities.map((activity) => (
            <SortableRoutineActivity
              key={activity.id}
              routineId={routineId}
              activity={activity}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
