import { ConfirmDeleteRoutineGroup } from "./confirm-delete-routine-group";
import { DurationLabel } from "@/components/core";
import { Fragment } from "react/jsx-runtime";
import { RoutineGroupExpandToggle } from "./routine-group-expand-toggle";
import { RoutineGroupName } from "./routine-group-name";
import { TaskCountLabel } from "./task-count-label";

import { useDeleteTasks } from "@/features/tasks/api/tanstack/use-delete-tasks";
import { useFutureTasksQueryOptions } from "@/features/tasks/hooks/use-future-tasks-query-options";

import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import type { WrappedRoutineRenderCard } from "@/features/tasks/types/scheduled-grouped-card";

interface Props {
  item: WrappedRoutineRenderCard<ScheduledTaskAPI>;
  onToggleExpanded: (routineApplicationId: number) => void;
}

export const FutureRoutineGroupContent = ({
  item,
  onToggleExpanded,
}: Props) => {
  const { mutate: deleteTasks } = useDeleteTasks(useFutureTasksQueryOptions());

  return (
    <Fragment>
      <div className="grow">
        <RoutineGroupName name={item.routine_name} />
        <div className="text-foreground-muted flex gap-2.5 text-xs">
          <TaskCountLabel count={item.absorbed_tasks.length} />
          <DurationLabel seconds={item.total_seconds} />
        </div>
      </div>
      {/* Intentionally delete the entire absorbed group, including unrelated tasks. */}
      <ConfirmDeleteRoutineGroup
        routineName={item.routine_name}
        onDelete={() => deleteTasks({ task_ids: item.absorbed_task_ids })}
      />
      <RoutineGroupExpandToggle
        routineApplicationId={item.routine_application_id}
        routineName={item.routine_name}
        expanded={item.expanded}
        onToggle={onToggleExpanded}
      />
    </Fragment>
  );
};
