import {
  DeleteAllScheduledTasks,
  ScheduledTaskRow,
  ScheduledTaskRowOverlay,
  SortableTaskList,
} from "@/features/tasks/components";
import { Loading } from "@/components/core";
import { ScheduledTaskListActions } from "./ScheduledTaskListActions";
import { SectionHeaderWithAction } from "@/components/layout";
import { TaskErrorList } from "@/features/tasks/components/TaskErrorList";

import { groupRoutineTasks } from "@/features/tasks/utils/group-routine-tasks";
import { projectScheduledItems } from "@/features/tasks/utils/project-scheduled-items";
import { useExpansionMap } from "@/features/tasks/hooks/use-expansion-map";
import { useScheduledDragHandlers } from "@/features/tasks/hooks/use-scheduled-drag-handlers";
import { useScheduledMutationOps } from "@/features/tasks/hooks/use-scheduled-mutation-ops";
import { useScheduledTasksData } from "@/features/tasks/hooks/use-scheduled-tasks-data";

const MIN_WORTH_TRIGGERING_THRESHOLD = 3;

export const ScheduledTaskList = () => {
  const data = useScheduledTasksData();

  // Keeps track of expanded group cards
  const [expandedGroups, toggleExpandedGroups] = useExpansionMap();

  // Returns a list of items with either `wrap` or `task` type.
  const groupedItems = groupRoutineTasks(data.tasksWithEST);

  const { performMove } = useScheduledMutationOps({
    rawItems: data.rawItems,
    groupedItems,
    setTempItems: data.setTempItems,
  });

  // Just surfaces what id we are dragging, and the handlers to manage it.
  const { draggingId, handleDragStart, handleDragEnd, handleDragCancel } =
    useScheduledDragHandlers({ performMove });

  if (data.isPending)
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

  if (data.isError) return <TaskErrorList refetch={data.refetch} />;

  /*
  For each wrap item whose routine_application_id is in expandedGroups, append its absorbed_tasks as expanded-child rows.
  If draggingId is a wrap item, filter out its absorbed_tasks from the result to avoid showing them while dragging.
  */
  const visibleItems = projectScheduledItems(
    groupedItems,
    expandedGroups,
    draggingId,
  );

  const displayDeleteAll = visibleItems.length > MIN_WORTH_TRIGGERING_THRESHOLD;

  return (
    <div>
      <SectionHeaderWithAction
        title="Scheduled Tasks"
        className="pr-2.5"
        action={<ScheduledTaskListActions />}
      />
      <SortableTaskList
        items={visibleItems}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        renderItem={(item) => (
          <ScheduledTaskRow
            item={item}
            expandedGroups={expandedGroups}
            draggingId={draggingId}
            onToggleExpanded={toggleExpandedGroups}
          />
        )}
        renderOverlay={(item) => <ScheduledTaskRowOverlay item={item} />}
      />
      {displayDeleteAll && (
        <div className="mt-2 text-center">
          <DeleteAllScheduledTasks />
        </div>
      )}
    </div>
  );
};
