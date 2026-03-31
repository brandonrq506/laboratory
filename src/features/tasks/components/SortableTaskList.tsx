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
import { Fragment, useEffect, useState } from "react";

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

import type { BaseEntity } from "@/types/core";
import type { SortableTaskListProps } from "../types/sortableTaskList";

export const SortableTaskList = <T extends BaseEntity>({
  tasks,
  renderItem,
  onDragEnd,
}: SortableTaskListProps<T>) => {
  const [sortedTasks, setSortedTasks] = useState<T[]>(tasks);

  // Ensure tasks don't jump back to original position on drag end before the mutation completes.
  useEffect(() => {
    setSortedTasks(tasks);
  }, [tasks]);

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex = sortedTasks.findIndex((task) => task.id === active.id);
    const newIndex = sortedTasks.findIndex((task) => task.id === over.id);

    const newTasks = arrayMove(sortedTasks, oldIndex, newIndex);

    const prevTaskId = newTasks[newIndex - 1]?.id ?? null;
    const nextTaskId = newTasks[newIndex + 1]?.id ?? null;

    setSortedTasks(newTasks);

    onDragEnd({
      taskId: active.id as number,
      prevTaskId,
      nextTaskId,
      tasks: newTasks,
    });
  };

  if (tasks.length === 0) return <TaskEmptyList />;

  return (
    <div className="space-y-3">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
        <SortableContext
          items={sortedTasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}>
          {sortedTasks.map((task) => (
            <Fragment key={task.id}>{renderItem(task)}</Fragment>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
