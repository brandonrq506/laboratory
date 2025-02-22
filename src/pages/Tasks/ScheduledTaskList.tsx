import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import {
  QuickCreateTaskMenu,
  ScheduledTask,
  TaskList,
} from "@/features/tasks/components";
import { Loading } from "@/components/core";
import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

export const ScheduledTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    status: "scheduled",
  });

  if (isPending)
    return (
      <div>
        <SectionHeaderWithAction
          title="Scheduled Tasks"
          className="pr-2.5"
          action={<QuickCreateTaskMenu />}
        />
        <Loading className="mx-auto my-10" sizeStyles="size-10" />
      </div>
    );

  if (isError) return <TaskErrorList refetch={refetch} />;

  return (
    <div>
      <SectionHeaderWithAction
        title="Scheduled Tasks"
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
