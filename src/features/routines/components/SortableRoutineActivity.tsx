import { useSortable } from "@dnd-kit/sortable";

import { Badge } from "@/components/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/layout";
import { ClockIcon } from "@heroicons/react/24/outline";
import { DeleteActivityRoutine } from "./DeleteActivityRoutine";
import { DragHandle } from "@/features/tasks/components/DragHandle";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";
import clsx from "clsx";

import type { RoutineActivityWithExpectedStartTime } from "../types/routine-with-expected-time";

type Props = {
  routineId: number;
  activity: RoutineActivityWithExpectedStartTime;
};

export const SortableRoutineActivity = ({ routineId, activity }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card
        className={clsx(
          "flex items-center justify-between shadow-2xs inset-shadow-xs transition-transform duration-100",
          isDragging && ["z-20 scale-105 border border-indigo-700 shadow-2xl"],
        )}>
        <div className="flex items-center gap-2">
          <DragHandle
            attributes={attributes}
            listeners={listeners}
            setActivatorNodeRef={setActivatorNodeRef}
          />

          <div className="flex items-center gap-2">
            <Badge color={activity.category_color}>
              {activity.activity_name}
            </Badge>

            <div className="flex gap-2 text-gray-600">
              <div className="flex gap-1 text-xs">
                <p className="tabular-nums">
                  {formatDatetimeTo12hTime(
                    activity.expected_start_time.toISOString(),
                  )}
                </p>
              </div>
              <div className="flex gap-1 text-xs">
                <ClockIcon className="size-4" />
                <p className="tabular-nums">
                  {secondsToTime(activity.activity_exp_seconds)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DeleteActivityRoutine activityId={activity.id} routineId={routineId} />
      </Card>
    </div>
  );
};
