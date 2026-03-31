import type { BaseEntity } from "@/types/core";

export interface OnDragEndArgs<T> {
  taskId: number;
  prevTaskId: number | null;
  nextTaskId: number | null;
  tasks: T[];
}

export interface SortableTaskListProps<T extends BaseEntity> {
  tasks: T[];
  renderItem: (item: T) => React.ReactNode;
  onDragEnd: ({
    taskId,
    prevTaskId,
    nextTaskId,
    tasks,
  }: OnDragEndArgs<T>) => void;
}
