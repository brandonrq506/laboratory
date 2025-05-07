import { useQuery } from "@tanstack/react-query";

import {
  DeleteAllScheduledTasks,
  ScheduledTask,
  TaskList,
} from "@/features/tasks/components";
import { AddScheduledTaskMenu } from "./AddScheduledTaskMenu";
import { Loading } from "@/components/core";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";
import { scheduledTasksOptions } from "@/features/tasks/api/queryOptions";

const MIN_WORTH_TRIGGERING_THRESHOLD = 3;

export const ScheduledTaskList = () => {
  const { data, isPending, isError, refetch } = useQuery(
    scheduledTasksOptions(),
  );

  if (isPending)
    return (
      <div>
        <SectionHeaderWithAction
          title="Scheduled Tasks"
          className="pr-2.5"
          action={<AddScheduledTaskMenu />}
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
        action={<AddScheduledTaskMenu />}
      />
      <TaskList
        tasks={data}
        renderItem={(task) => <ScheduledTask task={task} />}
      />
      {displayDeleteAll && (
        <div className="mt-2 text-center">
          <DeleteAllScheduledTasks />
        </div>
      )}
    </div>
  );
};
