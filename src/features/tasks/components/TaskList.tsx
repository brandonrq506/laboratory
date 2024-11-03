import { TaskAPI } from "../types/taskAPI";

type Props = {
  tasks: TaskAPI[];
};

export const TaskList = ({ tasks }: Props) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id} className="flex gap-4 px-3 py-2">
          <h3>{task.activity.name}</h3>
          <p>Category: {task.activity.category.name}</p>
          <p>Logged at: {task.created_at}</p>
        </div>
      ))}

      {tasks.length === 0 && <div>No tasks found</div>}
    </div>
  );
};
