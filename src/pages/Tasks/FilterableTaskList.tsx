import { useSearchParams } from "react-router";
import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { ScheduledTask, TaskList } from "@/features/tasks/components";
import { Button } from "@/components/core";
import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

export const FilterableTaskList = () => {
  const [params] = useSearchParams();
  const categoryParam = params.get("category_id");
  const category_id = categoryParam ? parseInt(categoryParam) : undefined;

  const { data, isPending, isError, refetch } = useTasks({
    category_id,
    status: "scheduled",
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <Button onClick={() => refetch()}>Try again</Button>;

  return (
    <TaskList
      tasks={data}
      renderItem={(task) => <ScheduledTask task={task as ScheduledTaskAPI} />}
    />
  );
};
