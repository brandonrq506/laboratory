import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { ScheduledTask, TaskList } from "@/features/tasks/components";
import { Button } from "@/components/core";
import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const today = new Date().toISOString().split("T")[0];

export const TodayScheduledTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    status: "scheduled",
    created_at: today,
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
