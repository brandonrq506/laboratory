import {
  FutureScheduledCardContent,
  ScheduledItemCard,
  ScheduledItemCardOverlay,
  SortableTaskList,
} from "@/features/tasks/components";
import { Loading } from "@/components/core";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

import { useFutureTasksQueryOptions } from "@/features/tasks/hooks/use-future-tasks-query-options";
import { useScheduledListController } from "@/features/tasks/hooks/use-scheduled-list-controller";
import { useScheduledListData } from "@/features/tasks/hooks/use-scheduled-list-data";

export const FutureScheduledTaskList = () => {
  const source = useScheduledListData(useFutureTasksQueryOptions());
  const list = useScheduledListController(source);

  if (source.isPending) {
    return <Loading className="mx-auto my-10" sizeStyles="size-10" />;
  }

  if (source.isError) return <TaskErrorList refetch={source.refetch} />;

  return (
    <SortableTaskList
      items={list.items}
      onDragStart={list.handleDragStart}
      onDragEnd={list.handleDragEnd}
      onDragCancel={list.handleDragCancel}
      renderItem={(item) => (
        <ScheduledItemCard item={item}>
          <FutureScheduledCardContent
            item={item}
            onToggleExpanded={list.toggleExpanded}
          />
        </ScheduledItemCard>
      )}
      renderOverlay={(item) => (
        <ScheduledItemCardOverlay item={item}>
          <FutureScheduledCardContent
            item={item}
            onToggleExpanded={list.toggleExpanded}
          />
        </ScheduledItemCardOverlay>
      )}
    />
  );
};
