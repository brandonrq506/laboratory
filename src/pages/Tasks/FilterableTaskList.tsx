import { useSearchParams } from "react-router";
import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { ScheduledTask, TaskList } from "@/features/tasks/components";
import { Button } from "@/components/core";
import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { TaskStatus } from "@/features/tasks/types/taskStatus";

// TODO: Make sure status is type-safe with custom useTaskStatusSearchParam or something
export const FilterableTaskList = () => {
  const [params] = useSearchParams();
  const categoryParam = params.get("category_id");
  const statusParam = params.get("status");

  const category_id = categoryParam ? parseInt(categoryParam) : undefined;
  const status = statusParam as TaskStatus | undefined;

  const { data, isPending, isError, refetch } = useTasks({
    category_id,
    status,
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
