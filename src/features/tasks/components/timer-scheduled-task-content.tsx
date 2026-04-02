import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Dot } from "@/components/core";
import { Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { QuickDeleteTask } from "./QuickDeleteTask";
import { ScheduledTaskActionBtn } from "./ScheduledTaskActionBtn";
import { ScheduledTaskWithExpectedStartTime } from "../types/scheduledTaskWithExpectedStartTime";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";
import { getColorByName } from "@/features/colors/utils/getColorByName";

type Props = {
  task: ScheduledTaskWithExpectedStartTime;
};

// TODO: Should only handle Sortable Logic, then we can have TimerScheduledTaskContent, FutureScheduledTaskContent,etc.

// TODO: Once above done, we can refactor SortableFutureTask.
export const TimerScheduledTaskContent = ({ task }: Props) => {
  const color = getColorByName(task.activity.category.color);

  return (
    <Fragment>
      <Link
        className="grow"
        from="/timer"
        to="$taskId/edit"
        params={{ taskId: task.id }}>
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="text-sm font-semibold">{task.activity.display_name}</p>
        </div>

        <div className="flex gap-2.5 text-gray-600">
          {task.expected_start_time && (
            <div className="flex gap-1 text-xs">
              <p className="tabular-nums">
                {formatDatetimeTo12hTime(
                  task.expected_start_time.toISOString(),
                )}
              </p>
            </div>
          )}
          <div className="flex gap-1 text-xs">
            <ClockIcon className="size-4" />
            <p className="tabular-nums">
              {secondsToTime(task.activity.exp_seconds)}
            </p>
          </div>
          {task.note && <ChatBubbleLeftEllipsisIcon className="size-4" />}
        </div>
      </Link>
      <QuickDeleteTask taskId={task.id} />
      <ScheduledTaskActionBtn task={task} />
    </Fragment>
  );
};
