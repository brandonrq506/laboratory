import { Link, type LinkProps } from "@tanstack/react-router";
import { Card } from "@/components/layout";
import type { CompletedTaskAPI } from "../types/completedTask";
import { DeleteTask } from "./DeleteTask";
import { Dot } from "@/components/core";
import { TaskNotePreview } from "./TaskNotePreview";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";
import { getColorByName } from "@/features/colors/utils/getColorByName";
import { getDurationInSeconds } from "../utils/getDurationInSeconds";

import { PerformanceDelta } from "./PerformanceDelta";
import { getPerformanceDelta } from "../utils/getPerformanceDelta";

type Props = { task: CompletedTaskAPI; linkProps: LinkProps };

export const CompletedTask = ({ task, linkProps }: Props) => {
  const color = getColorByName(task.activity.category.color);
  const durationSeconds = getDurationInSeconds(task.start_time, task.end_time);
  const { minutes, tier } = getPerformanceDelta({
    activity: task.activity,
    duration_seconds: durationSeconds,
  });

  return (
    <Card className="flex justify-between gap-1 shadow-xs">
      <Link {...linkProps} className="min-w-0 grow">
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="text-sm font-semibold">{task.activity.display_name}</p>
          <p className="text-foreground-muted text-xs tabular-nums">
            {secondsToTime(durationSeconds)}
          </p>
        </div>

        <div className="text-foreground-muted flex gap-2.5 text-xs whitespace-nowrap">
          <p className="tabular-nums">
            {formatDatetimeTo12hTime(task.start_time)}
          </p>
          <p>{` — `}</p>
          <p className="tabular-nums">
            {formatDatetimeTo12hTime(task.end_time)}
          </p>
          <TaskNotePreview note={task.note} />
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <PerformanceDelta minutes={minutes} tier={tier} className="text-xs" />
        <DeleteTask taskId={task.id} />
      </div>
    </Card>
  );
};
