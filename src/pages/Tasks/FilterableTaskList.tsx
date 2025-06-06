import { Link, useSearchParams } from "react-router";
import { usePrefetchTask } from "@/features/tasks/api/tanstack/usePrefetchTask";
import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { Button } from "@/components/core";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

export const FilterableTaskList = () => {
  const prefetchTask = usePrefetchTask();
  const [params] = useSearchParams();
  const dateParam = params.get("date") ?? "today";

  const { data, isPending, isError, refetch } = useTasks({
    filter: { status: "completed", start_time: dateParam },
    sort: { sort_by: "start_time", sort_order: "asc" },
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <Button onClick={() => refetch()}>Try again</Button>;

  return (
    <TaskList
      tasks={data}
      renderItem={(task) => (
        <Link
          key={task.id}
          to={`edit/${task.id}?date=${dateParam}`}
          onFocus={() => prefetchTask(task.id)}
          onMouseEnter={() => prefetchTask(task.id)}>
          <CompletedTask task={task as CompletedTaskAPI} />
        </Link>
      )}
    />
  );
};
