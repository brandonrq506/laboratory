import { Dot, DurationLabel, StartTimeLabel } from "@/components/core";
import { Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { QuickDeleteTask } from "./QuickDeleteTask";
import { ScheduledTaskActionBtn } from "./ScheduledTaskActionBtn";
import type { ScheduledTaskWithEST } from "../types/scheduledTaskWithEST";
import { TaskNotePreview } from "./TaskNotePreview";

import { getColorByName } from "@/features/colors/utils/getColorByName";

type Props = {
  task: ScheduledTaskWithEST;
};

export const TimerScheduledTaskContent = ({ task }: Props) => {
  const color = getColorByName(task.activity.category.color);

  return (
    <Fragment>
      <Link
        className="min-w-0 grow"
        from="/timer"
        to="$taskId/edit"
        params={{ taskId: task.id }}>
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="text-sm font-semibold">{task.activity.display_name}</p>
        </div>

        <div className="text-foreground-muted flex gap-2.5 text-xs whitespace-nowrap">
          <StartTimeLabel date={task.expected_start_time} />
          <DurationLabel seconds={task.activity.exp_seconds} />
          <TaskNotePreview note={task.note} />
        </div>
      </Link>
      <QuickDeleteTask taskId={task.id} />
      <ScheduledTaskActionBtn task={task} />
    </Fragment>
  );
};
