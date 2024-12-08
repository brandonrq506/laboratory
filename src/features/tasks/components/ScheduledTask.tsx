import { Card } from "@/components/layout";
import { Dot } from "@/components/core";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { ScheduledTaskActionMenu } from "./ScheduledTaskActionMenu";

import { convertSecondsToTime } from "@/utils";
import { getColorByName } from "@/features/colors/utils/getColorByName";

type Props = { task: ScheduledTaskAPI };

export const ScheduledTask = ({ task }: Props) => {
  const color = getColorByName(task.activity.category.color);

  return (
    <Card className="flex justify-between shadow-sm">
      <div>
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="text-sm font-semibold">{task.activity.name}</p>
        </div>

        <div className="flex gap-1 text-xs text-gray-600">
          {task.activity.avg_time && (
            <>
              <p>Avg: </p>
              <p className="tabular-nums">
                {convertSecondsToTime(task.activity.avg_time)}
              </p>
            </>
          )}

          {!task.activity.avg_time && <p>Average time undefined</p>}
        </div>
      </div>

      <ScheduledTaskActionMenu taskId={task.id} />
    </Card>
  );
};
