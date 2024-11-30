import { ScheduledTask } from "./ScheduledTask";
import { TaskAPI } from "../types/taskAPI";

type Props = {
  tasks: TaskAPI[];
};

export const TaskList = ({ tasks }: Props) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} className="my-1">
          <ScheduledTask task={task} />
        </li>
      ))}

      {tasks.length === 0 && <div>No tasks found</div>}
    </ul>
  );
};
