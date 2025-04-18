import { Card, SectionHeaderWithAction } from "@/components/layout";
import { Badge } from "@/components/core";
import { Routine } from "../types/routine";

import { calculateTotalAvgTime } from "../utils/calculateTotalAvgTime";
import { convertSecondsToTime } from "@/utils";

const MAX_VISIBLE_ACTIVITIES = 5;

interface Props {
  routine: Routine;
}

export const RoutineCard = ({ routine }: Props) => {
  const totalAvgTime = calculateTotalAvgTime(routine.activities);
  const totalTime = convertSecondsToTime(totalAvgTime);

  return (
    <Card className="relative h-full w-full overflow-hidden">
      <SectionHeaderWithAction
        title={routine.name}
        className="gap-x-2"
        action={<div className="text-sm tabular-nums">{totalTime}</div>}
      />

      {routine.activities.map((activity) => (
        <div key={activity.id} className="my-1 flex justify-between">
          <div className="flex items-center gap-x-2">
            <Badge color={activity.category_color}>
              {activity.activity_name}
            </Badge>
            <span className="text-xs text-gray-500">
              {activity.category_name}
            </span>
          </div>

          <div>
            <span className="text-xs">
              {convertSecondsToTime(activity.activity_avg_time)}
            </span>
          </div>
        </div>
      ))}

      {routine.activities.length === 0 && (
        <div className="flex h-20 items-center justify-center">
          <span className="text-sm text-gray-500">No activities</span>
        </div>
      )}
      {routine.activities.length > MAX_VISIBLE_ACTIVITIES && (
        <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t from-white to-transparent" />
      )}
    </Card>
  );
};
