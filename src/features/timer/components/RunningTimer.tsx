import { usePrefetchTask } from "@/features/tasks/api/tanstack/usePrefetchTask";

import { Dot } from "@/components/core";
import { InProgressTaskAPI } from "@/features/tasks/types/inProgressTask";
import { Link } from "@tanstack/react-router";
import { RunningTimerButton } from "./RunningTimerButton";
import { TimerTime } from "./TimerTime";

import { getColorByName } from "@/features/colors/utils/getColorByName";

type Props = {
  task: InProgressTaskAPI;
};

export const RunningTimer = ({ task }: Props) => {
  const prefetchTask = usePrefetchTask();

  const color = getColorByName(task.activity.category.color);

  return (
    <div className="flex items-center gap-2">
      <Link
        to="/timer/$taskId/edit"
        params={{ taskId: String(task.id) }}
        className="w-full"
        onFocus={() => prefetchTask(task.id)}
        onMouseEnter={() => prefetchTask(task.id)}>
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="line-clamp-1 text-sm font-semibold">
            {task.activity.display_name}
          </p>
        </div>
        <p className="text-xs">
          {new Date(task.start_time).toLocaleTimeString()}
        </p>
      </Link>
      <TimerTime
        start_time={task.start_time}
        exp_seconds={task.activity.exp_seconds}
      />

      <RunningTimerButton task={task} />
    </div>
  );
};
