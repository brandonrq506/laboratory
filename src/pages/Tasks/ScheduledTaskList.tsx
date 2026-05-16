import {
  DeleteAllScheduledTasks,
  SortableTaskList,
  TimerScheduledTaskContent,
} from "@/features/tasks/components";
import { Loading, SortableItemCard } from "@/components/core";
import { RoutineGroupCard } from "@/features/routines/components";
import { ScheduledTaskListActions } from "./ScheduledTaskListActions";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

import { useScheduledTasksSorting } from "@/features/tasks/hooks/use-scheduled-tasks-sorting";

import type { ScheduledRenderItem } from "@/features/tasks/types/scheduled-visible-item";

const MIN_WORTH_TRIGGERING_THRESHOLD = 3;

export const ScheduledTaskList = () => {
  const sorting = useScheduledTasksSorting();

  if (sorting.isPending)
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

  if (sorting.isError) return <TaskErrorList refetch={sorting.refetch} />;

  const renderRow = (item: ScheduledRenderItem) => {
    switch (item.kind) {
      case "task":
        return (
          <SortableItemCard itemId={item.id}>
            <TimerScheduledTaskContent task={item.task} />
          </SortableItemCard>
        );
      case "wrap":
        return (
          <RoutineGroupCard
            item={item}
            expanded={sorting.expansionByApplicationId.has(
              item.routine_application_id,
            )}
            isDraggingThisCard={sorting.draggingId === item.id}
            onToggleExpanded={sorting.toggleExpanded}
            onBulkDelete={sorting.bulkDeleteAbsorbed}
          />
        );
      case "expanded-child":
        return (
          <SortableItemCard itemId={item.id} className="ml-4">
            <TimerScheduledTaskContent task={item.task} />
          </SortableItemCard>
        );
      default:
        return null;
    }
  };

  const renderOverlay = (item: ScheduledRenderItem) => {
    switch (item.kind) {
      case "task":
        return (
          <SortableItemCard itemId={item.id} isOverlay>
            <TimerScheduledTaskContent task={item.task} />
          </SortableItemCard>
        );
      case "wrap":
        return (
          <RoutineGroupCard
            item={item}
            expanded={false}
            isDraggingThisCard={false}
            onToggleExpanded={() => {}}
            onBulkDelete={() => {}}
            isOverlay
          />
        );
      case "expanded-child":
        return (
          <SortableItemCard itemId={item.id} className="ml-4" isOverlay>
            <TimerScheduledTaskContent task={item.task} />
          </SortableItemCard>
        );
      default:
        return null;
    }
  };

  const displayDeleteAll =
    sorting.renderItems.length > MIN_WORTH_TRIGGERING_THRESHOLD;

  return (
    <div>
      <SectionHeaderWithAction
        title="Scheduled Tasks"
        className="pr-2.5"
        action={<ScheduledTaskListActions />}
      />
      <SortableTaskList
        items={sorting.renderItems}
        onDragStart={sorting.handleDragStart}
        onDragEnd={sorting.handleDragEnd}
        onDragCancel={sorting.handleDragCancel}
        renderItem={renderRow}
        renderOverlay={renderOverlay}
      />
      {displayDeleteAll && (
        <div className="mt-2 text-center">
          <DeleteAllScheduledTasks />
        </div>
      )}
    </div>
  );
};
