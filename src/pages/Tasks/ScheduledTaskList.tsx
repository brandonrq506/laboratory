import {
  DeleteAllScheduledTasks,
  ScheduledItemCard,
  ScheduledItemCardOverlay,
  SortableTaskList,
  TimerScheduledCardContent,
} from "@/features/tasks/components";
import { Loading } from "@/components/core";
import { ScheduledTaskListActions } from "./ScheduledTaskListActions";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

import { useScheduledListController } from "@/features/tasks/hooks/use-scheduled-list-controller";
import { useTimerScheduledListData } from "@/features/tasks/hooks/use-timer-scheduled-list-data";

const MIN_WORTH_TRIGGERING_THRESHOLD = 3;

export const ScheduledTaskList = () => {
  const source = useTimerScheduledListData();
  const list = useScheduledListController(source);

  if (source.isPending)
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

  if (source.isError) return <TaskErrorList refetch={source.refetch} />;

  const displayDeleteAll = list.items.length > MIN_WORTH_TRIGGERING_THRESHOLD;

  return (
    <div>
      <SectionHeaderWithAction
        title="Scheduled Tasks"
        className="pr-2.5"
        action={<ScheduledTaskListActions />}
      />
      <SortableTaskList
        items={list.items}
        onDragStart={list.handleDragStart}
        onDragEnd={list.handleDragEnd}
        onDragCancel={list.handleDragCancel}
        renderItem={(item) => (
          <ScheduledItemCard item={item}>
            <TimerScheduledCardContent
              item={item}
              onToggleExpanded={list.toggleExpanded}
            />
          </ScheduledItemCard>
        )}
        renderOverlay={(item) => (
          <ScheduledItemCardOverlay item={item}>
            <TimerScheduledCardContent
              item={item}
              onToggleExpanded={list.toggleExpanded}
            />
          </ScheduledItemCardOverlay>
        )}
      />
      {displayDeleteAll && (
        <div className="mt-2 text-center">
          <DeleteAllScheduledTasks />
        </div>
      )}
    </div>
  );
};
