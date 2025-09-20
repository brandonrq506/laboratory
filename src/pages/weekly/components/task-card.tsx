import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

interface Props {
  cardHeight: number;
  task: CompletedTaskAPI;
}

// Displays the task information based on the height.
export const TaskCard = ({ cardHeight, task }: Props) => {
  return (
    <div style={{ height: cardHeight }}>
      <h3>{task.activity.name}</h3>
      <p>{task.start_time}</p>
    </div>
  );
};
