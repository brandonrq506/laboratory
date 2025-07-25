import { useSortable } from "@dnd-kit/sortable";

import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/layout";
import { Dot } from "@/components/core";
import { DragHandle } from "./DragHandle";
import { Link } from "react-router";
import { QuickDeleteTask } from "./QuickDeleteTask";
import { ScheduledTaskWithExpectedStartTime } from "../types/scheduledTaskWithExpectedStartTime";
import { StartTaskBtn } from "./StartTaskBtn";

import { formatDatetimeTo12hTime, secondsToTime } from "@/utils";
import clsx from "clsx";
import { getColorByName } from "@/features/colors/utils/getColorByName";
import { usePrefetchTask } from "../api/tanstack/usePrefetchTask";

type Props = {
  task: ScheduledTaskWithExpectedStartTime;
};

export const SortableTask = ({ task }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
  const prefetchTask = usePrefetchTask();
  const color = getColorByName(task.activity.category.color);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <Card
        className={clsx(
          "flex justify-between shadow-xs transition-transform duration-100",
          isDragging && ["z-20 scale-105 border border-indigo-700 shadow-2xl"],
        )}>
        <div className="flex grow items-center gap-2">
          <DragHandle
            attributes={attributes}
            listeners={listeners}
            setActivatorNodeRef={setActivatorNodeRef}
          />

          <Link
            className="grow"
            to={`edit/${task.id}`}
            onFocus={() => prefetchTask(task.id)}
            onMouseEnter={() => prefetchTask(task.id)}>
            <div className="flex items-center gap-1.5">
              <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
              <p className="text-sm font-semibold">{task.activity.name}</p>
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
        </div>

        <div className="flex items-center gap-3">
          <QuickDeleteTask taskId={task.id} />
          <StartTaskBtn task={task} />
        </div>
      </Card>
    </div>
  );
};
