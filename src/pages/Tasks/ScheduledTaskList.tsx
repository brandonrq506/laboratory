import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import {
  DeleteAllScheduledTasks,
  QuickCreateTaskMenu,
  ScheduledTask,
  TaskList,
} from "@/features/tasks/components";
import { Loading } from "@/components/core";
import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

const MIN_WORTH_TRIGGERING_THRESHOLD = 3;

export const ScheduledTaskList = () => {
  const { data, isPending, isError, refetch } = useTasks({
    filter: { status: "scheduled" },
    sort: { sort_by: "position", sort_order: "asc" },
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

  const displayDeleteAll = data.length > MIN_WORTH_TRIGGERING_THRESHOLD;

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
      {displayDeleteAll && (
        <div className="mt-2 text-center">
          <DeleteAllScheduledTasks />
        </div>
      )}
    </div>
  );
};
