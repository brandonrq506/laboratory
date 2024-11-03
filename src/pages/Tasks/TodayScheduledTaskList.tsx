import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { Button } from "@/components/core";
import { TaskList } from "@/features/tasks/components";

const today = new Date().toISOString().split("T")[0];

export const TodayScheduledTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    status: "scheduled",
    created_at: today,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <Button onClick={() => refetch()}>Try again</Button>;

  return <TaskList tasks={data} />;
};
