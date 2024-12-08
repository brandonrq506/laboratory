import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { ScheduledTask, TaskList } from "@/features/tasks/components";
import { IconButton } from "@/components/core";
import { PlusIcon } from "@heroicons/react/24/outline";
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
        action={
          <IconButton shape="circle">
            <PlusIcon className="size-5" aria-hidden />
          </IconButton>
        }
      />
      <TaskList
        tasks={data}
        renderItem={(task) => <ScheduledTask task={task as ScheduledTaskAPI} />}
      />
    </div>
  );
};
