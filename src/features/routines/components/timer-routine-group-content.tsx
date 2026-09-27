import { DurationLabel, StartTimeLabel } from "@/components/core";
import { DeleteRoutineGroupButton } from "./delete-routine-group-button";
import { Fragment } from "react/jsx-runtime";
import { RoutineGroupExpandToggle } from "./routine-group-expand-toggle";
import { RoutineGroupName } from "./routine-group-name";
import { TaskCountLabel } from "./task-count-label";

import { scheduledTasksQueryOptions } from "@/features/tasks/api/queries";
import { useDeleteTasks } from "@/features/tasks/api/tanstack/use-delete-tasks";

import type { ScheduledTaskWithEST } from "@/features/tasks/types/scheduledTaskWithEST";
import type { WrappedRoutineRenderCard } from "@/features/tasks/types/scheduled-grouped-card";

interface Props {
  item: WrappedRoutineRenderCard<ScheduledTaskWithEST>;
  onToggleExpanded: (routineApplicationId: number) => void;
}

export const TimerRoutineGroupContent = ({ item, onToggleExpanded }: Props) => {
  const { mutate: deleteTasks } = useDeleteTasks(scheduledTasksQueryOptions());

  // Safe: a wrap always absorbs at least MIN_TASKS_TO_WRAP tasks.
  const firstTask = item.absorbed_tasks[0];

  return (
    <Fragment>
      <div className="grow">
        <RoutineGroupName name={item.routine_name} />
        <div className="text-foreground-muted flex gap-2.5 text-xs">
          <TaskCountLabel count={item.absorbed_tasks.length} />
          <StartTimeLabel date={firstTask.expected_start_time} />
          <DurationLabel seconds={item.total_seconds} />
        </div>
      </div>
      {/* Intentionally delete the entire absorbed group, including unrelated tasks. */}
      <DeleteRoutineGroupButton
        routineName={item.routine_name}
        onClick={() => deleteTasks({ task_ids: item.absorbed_task_ids })}
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
