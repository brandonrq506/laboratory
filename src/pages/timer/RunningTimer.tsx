import { usePrefetchTask } from "@/features/tasks/api/tanstack/usePrefetchTask";

import { Dot } from "@/components/core";
import { InProgressTaskAPI } from "@/features/tasks/types/inProgressTast";
import { Link } from "react-router";
import { RunningTimerButton } from "./RunningTimerButton";
import { TimerTime } from "./TimerTime";

import { convertSecondsToHHMMSS } from "@/utils";
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
        to={`edit/${task.id}`}
        className="w-full"
        onFocus={() => prefetchTask(task.id)}
        onMouseEnter={() => prefetchTask(task.id)}>
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="line-clamp-1 text-sm font-semibold">
            {task.activity.name}
          </p>
        </div>
        <p className="text-xs">
          {new Date(task.start_time).toLocaleTimeString()}
        </p>
      </Link>
      <div className="flex gap-x-1.5 text-sm">
        <TimerTime start_time={task.start_time} />
        <p className="font-light text-gray-700">/</p>
        {task.activity.max_time &&
          convertSecondsToHHMMSS(task.activity.max_time)}
      </div>

      <RunningTimerButton taskId={task.id} />
    </div>
  );
};
