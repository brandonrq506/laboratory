import { useSortable } from "@dnd-kit/sortable";

import { Badge } from "@/components/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/layout";
import { DeleteActivityRoutine } from "./DeleteActivityRoutine";
import { DragHandle } from "@/features/tasks/components/DragHandle";
import clsx from "clsx";
import { secondsToTime } from "@/utils";

import { RoutineActivity } from "../types/routineActivity";

type Props = {
  routineId: number;
  activity: RoutineActivity;
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
            <span className="text-xs">
              {secondsToTime(activity.activity_exp_seconds)}
            </span>
          </div>
        </div>

        <DeleteActivityRoutine activityId={activity.id} routineId={routineId} />
      </Card>
    </div>
  );
};
