import { Card } from "@/components/layout";
import { ClockIcon } from "@heroicons/react/24/outline";
import { Dot } from "@/components/core";
import { ScheduledTaskActionMenu } from "./ScheduledTaskActionMenu";
import { ScheduledTaskWithExpectedStartTime } from "../types/scheduledTaskWithExpectedStartTime";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";
import { getColorByName } from "@/features/colors/utils/getColorByName";

type Props = {
  task: ScheduledTaskWithExpectedStartTime;
};

export const ScheduledTask = ({ task }: Props) => {
  const color = getColorByName(task.activity.category.color);

  return (
    <Card className="flex justify-between shadow-xs">
      <div>
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="text-sm font-semibold">{task.activity.name}</p>
        </div>

        <div className="flex gap-2.5">
          {task.expected_start_time && (
            <div className="flex gap-1 text-xs text-gray-600">
              <p className="tabular-nums">
                {formatDatetimeTo12hTime(
                  task.expected_start_time.toISOString(),
                )}
              </p>
            </div>
          )}
          {task.activity.avg_time && (
            <div className="flex gap-1 text-xs text-gray-600">
              <ClockIcon className="size-4" />
              <p className="tabular-nums">
                {secondsToTime(task.activity.avg_time)}
              </p>
            </div>
          )}
        </div>
      </div>

      <ScheduledTaskActionMenu task={task} />
    </Card>
  );
};
