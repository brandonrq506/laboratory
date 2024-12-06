import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { CompletedTask, TaskList } from "@/features/tasks/components";
import { Button } from "@/components/core";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";

const today = new Date().toISOString().split("T")[0];

export const TodayCompletedTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    status: "completed",
    created_at: today,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <Button onClick={() => refetch()}>Try again</Button>;

  return (
    <TaskList
      tasks={data}
      renderItem={(task) => <CompletedTask task={task as CompletedTaskAPI} />}
    />
  );
};
