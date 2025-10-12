import { useQuery } from "@tanstack/react-query";

import {
  DeleteAllScheduledTasks,
  SortableTaskList,
} from "@/features/tasks/components";
import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { AddScheduledTaskMenu } from "./AddScheduledTaskMenu";
import { Loading } from "@/components/core";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";
import { calculateExpectedStartTimes } from "@/features/tasks/utils/calculateExpectedStartTimes";

const MIN_WORTH_TRIGGERING_THRESHOLD = 3;

export const ScheduledTaskList = () => {
  const { data: inProgressTask } = useQuery(inProgressTasksQueryOptions());
  const { data, isPending, isError, refetch } = useQuery(
    scheduledTasksQueryOptions(),
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

  const tasksWithExpectedStartTime = calculateExpectedStartTimes(
    data,
    inProgressTask?.[0],
  );

  return (
    <div>
      <SectionHeaderWithAction
        title="Scheduled Tasks"
        className="pr-2.5"
        action={<AddScheduledTaskMenu />}
      />
      <SortableTaskList tasks={tasksWithExpectedStartTime} />
      {displayDeleteAll && (
        <div className="mt-2 text-center">
          <DeleteAllScheduledTasks />
        </div>
      )}
    </div>
  );
};
