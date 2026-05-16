import {
  FutureScheduledTaskContent,
  SortableTaskList,
} from "@/features/tasks/components";
import { Loading, SortableItemCard } from "@/components/core";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

import { useFutureScheduledTasksSorting } from "@/features/tasks/hooks/use-future-scheduled-tasks-sorting";

import { getRouteApi } from "@tanstack/react-router";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";

const routeApi = getRouteApi("/__protected/scheduled");

const renderRow = (task: ScheduledTaskAPI) => (
  <SortableItemCard itemId={task.id}>
    <FutureScheduledTaskContent task={task} />
  </SortableItemCard>
);

export const FutureScheduledTaskList = () => {
  const { date } = routeApi.useSearch();
  const sorting = useFutureScheduledTasksSorting(date);

  if (sorting.isPending) {
    return <Loading className="mx-auto my-10" sizeStyles="size-10" />;
  }

  if (sorting.isError) return <TaskErrorList refetch={sorting.refetch} />;

  return (
    <SortableTaskList
      items={sorting.renderItems}
      onDragStart={sorting.handleDragStart}
      onDragEnd={sorting.handleDragEnd}
      onDragCancel={sorting.handleDragCancel}
      renderItem={renderRow}
    />
  );
};
