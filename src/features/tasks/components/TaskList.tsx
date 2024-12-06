import { BaseEntity } from "@/types/core";

type Props<T> = {
  tasks: T[];
  renderItem: (item: T) => React.ReactNode;
};

export const TaskList = <T extends BaseEntity>({
  tasks,
  renderItem,
}: Props<T>) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="my-1">
          {renderItem(task)}
        </li>
      ))}

      {tasks.length === 0 && <div>No tasks found</div>}
    </ul>
  );
};
