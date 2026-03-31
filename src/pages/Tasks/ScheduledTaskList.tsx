import { useMoveTask } from "@/features/tasks/api/tanstack/useMoveTask";
import { useQuery } from "@tanstack/react-query";

import {
  DeleteAllScheduledTasks,
  SortableTask,
  SortableTaskList,
} from "@/features/tasks/components";
import { Loading } from "@/components/core";
import { ScheduledTaskListActions } from "./ScheduledTaskListActions";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { calculateExpectedStartTimes } from "@/features/tasks/utils/calculateExpectedStartTimes";

import type { OnDragEndArgs } from "@/features/tasks/types/sortableTaskList";
import type { ScheduledTaskWithExpectedStartTime } from "@/features/tasks/types/scheduledTaskWithExpectedStartTime";

const MIN_WORTH_TRIGGERING_THRESHOLD = 3;

export const ScheduledTaskList = () => {
  const { data: inProgressTask } = useQuery(inProgressTasksQueryOptions());
  const { data, isPending, isError, refetch } = useQuery(
    scheduledTasksQueryOptions(),
  );
  const { mutate: moveTask } = useMoveTask();

  if (isPending)
    return (
      <div>
        <SectionHeaderWithAction
          title="Scheduled Tasks"
          className="pr-2.5"
          action={<ScheduledTaskListActions />}
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

  const handleDragEnd = ({
    taskId,
    prevTaskId,
    nextTaskId,
    tasks,
  }: OnDragEndArgs<ScheduledTaskWithExpectedStartTime>) => {
    moveTask({
      taskId,
      prevTaskId,
      nextTaskId,
      tasks,
    });
  };

  return (
    <div>
      <SectionHeaderWithAction
        title="Scheduled Tasks"
        className="pr-2.5"
        action={<ScheduledTaskListActions />}
      />
      <SortableTaskList
        onDragEnd={handleDragEnd}
        tasks={tasksWithExpectedStartTime}
        renderItem={(task) => <SortableTask task={task} />}
      />
      {displayDeleteAll && (
        <div className="mt-2 text-center">
          <DeleteAllScheduledTasks />
        </div>
      )}
    </div>
  );
};
