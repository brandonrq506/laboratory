import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

interface Props {
  date: string;
}

// This is where we fetch the data and display the tasks for this day
export const DayColumn = ({ date }: Props) => {
  const { data } = useTasks({
    filter: { status: "completed", start_time: date },
    sort: { sort_by: "start_time", sort_order: "asc" },
  });

  return (
    <div>
      <h2>{date}</h2>
      <ul>
        {data?.map((task) => (
          <li key={task.id}>{task.activity.name}</li>
        ))}
      </ul>
    </div>
  );
};
