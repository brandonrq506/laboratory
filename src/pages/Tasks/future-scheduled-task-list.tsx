import { useFutureMoveTask } from "@/features/tasks/api/tanstack/use-move-future-task";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  SortableFutureTask,
  SortableTaskList,
} from "@/features/tasks/components";

import { futureTasksQueryOptions } from "@/features/tasks/api/queries";
import { getRouteApi } from "@tanstack/react-router";

import type { OnDragEndArgs } from "@/features/tasks/types/sortableTaskList";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const routeApi = getRouteApi("/__protected/scheduled");

export const FutureScheduledTaskList = () => {
  const { date } = routeApi.useSearch();
  const { data } = useSuspenseQuery(futureTasksQueryOptions(date));
  const { mutate: moveTask } = useFutureMoveTask(date);

  const handleDragEnd = ({
    taskId,
    prevTaskId,
    nextTaskId,
    tasks,
  }: OnDragEndArgs<ScheduledTaskAPI>) => {
    moveTask({
      taskId,
      prevTaskId,
      nextTaskId,
      tasks,
    });
  };

  // TODO: Create ticket

  /*
  If I wrap this in a Link, we will have the same problem of deleting modal later showing edit modal.
  So the changes to that component should be done before we make this editable.
  */

  return (
    <SortableTaskList
      tasks={data}
      onDragEnd={handleDragEnd}
      renderItem={(task) => (
        // Wrapped by a Link
        <SortableFutureTask task={task} />
        // Wrapped by a Link
      )}
    />
  );
};
