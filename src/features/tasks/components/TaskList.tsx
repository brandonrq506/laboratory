import { BaseEntity } from "@/types/core";
import { TaskEmptyList } from "./TaskEmptyList";

type Props<T> = {
  tasks: T[];
  renderItem: (item: T) => React.ReactNode;
};

export const TaskList = <T extends BaseEntity>({
  tasks,
  renderItem,
}: Props<T>) => {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li key={task.id}>{renderItem(task)}</li>
      ))}

      {tasks.length === 0 && <TaskEmptyList />}
    </ul>
  );
};
