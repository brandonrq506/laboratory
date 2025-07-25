import { Card } from "@/components/layout";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { CompletedTaskAPI } from "../types/completedTask";
import { DeleteTask } from "./DeleteTask";
import { Dot } from "@/components/core";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";
import { getColorByName } from "@/features/colors/utils/getColorByName";
import { getDurationInSeconds } from "../utils/getDurationInSeconds";

import { getPerformanceEmoji } from "../utils/getPerformanceEmoji";

type Props = { task: CompletedTaskAPI };

export const CompletedTask = ({ task }: Props) => {
  const color = getColorByName(task.activity.category.color);
  const durationSeconds = getDurationInSeconds(task.start_time, task.end_time);

  return (
    <Card className="flex justify-between shadow-xs">
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="text-sm font-semibold">{task.activity.name}</p>
          <p className="text-xs text-gray-600 tabular-nums">
            {secondsToTime(durationSeconds)}
          </p>
        </div>

        <div className="flex gap-2.5 text-xs text-gray-600">
          <p className="tabular-nums">
            {formatDatetimeTo12hTime(task.start_time)}
          </p>
          <p>{` — `}</p>
          <p className="tabular-nums">
            {formatDatetimeTo12hTime(task.end_time)}
          </p>

          {task.note && <ChatBubbleLeftEllipsisIcon className="size-4" />}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs">
          {getPerformanceEmoji({
            activity: task.activity,
            duration_seconds: durationSeconds,
          })}
        </span>
        <DeleteTask taskId={task.id} />
      </div>
    </Card>
  );
};
