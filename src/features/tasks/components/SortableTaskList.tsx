import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
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
import { useEffect, useState } from "react";

import { ScheduledTaskWithExpectedStartTime } from "../types/scheduledTaskWithExpectedStartTime";
import { SortableTask } from "./";
import { TaskEmptyList } from "./TaskEmptyList";
import { useMoveTask } from "../api/tanstack/useMoveTask";

const measuringConfig = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

type Props = {
  tasks: ScheduledTaskWithExpectedStartTime[];
};

export const SortableTaskList = ({ tasks }: Props) => {
  const [sortedTasks, setSortedTasks] =
    useState<ScheduledTaskWithExpectedStartTime[]>(tasks);
  const { mutate: moveTask } = useMoveTask();

  useEffect(() => {
    setSortedTasks(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex = sortedTasks.findIndex((task) => task.id === active.id);
    const newIndex = sortedTasks.findIndex((task) => task.id === over.id);

    /*
      This useEffect and state is to ensure UI optimistic updates.
      The optimistic update defined in useMoveTask is to optimistically update expected times.
      Both these are necessary for a smooth user experience.
    */
    const newTasks = arrayMove(sortedTasks, oldIndex, newIndex);
    setSortedTasks(newTasks);

    const destination = over.data as {
      current: { sortable: { index: number } };
    };

    moveTask({
      taskId: active.id as number,
      newPosition: destination.current.sortable.index,
      tasks: newTasks,
    });
  };

  if (tasks.length === 0) return <TaskEmptyList />;

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        measuring={measuringConfig}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        <SortableContext
          items={sortedTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}>
          {sortedTasks.map((task) => (
            <SortableTask key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
