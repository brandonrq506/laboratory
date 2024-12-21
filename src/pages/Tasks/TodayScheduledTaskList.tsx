import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import {
  QuickCreateTaskMenu,
  ScheduledTask,
  TaskList,
} from "@/features/tasks/components";
import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

const today = new Date().toISOString().split("T")[0];

export const TodayScheduledTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    status: "scheduled",
    created_at: today,
  });

  if (isPending) return <div>Loading...</div>;

  if (isError) return <TaskErrorList refetch={refetch} />;

  return (
    <div>
      <SectionHeaderWithAction
        title="Today's Scheduled Tasks"
        className="pr-2.5"
        action={<QuickCreateTaskMenu />}
      />
      <TaskList
        tasks={data}
        renderItem={(task) => <ScheduledTask task={task as ScheduledTaskAPI} />}
      />
    </div>
  );
};
