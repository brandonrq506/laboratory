import { useSortable } from "@dnd-kit/sortable";

import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/layout";
import { DeleteTask } from "./DeleteTask";
import { Dot } from "@/components/core";
import { DragHandle } from "./DragHandle";

import clsx from "clsx";
import { getColorByName } from "@/features/colors/utils/getColorByName";
import { secondsToTime } from "@/utils";

import type { ScheduledTaskAPI } from "../types/scheduledTask";

type Props = {
  task: ScheduledTaskAPI;
};

export const SortableFutureTask = ({ task }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });
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

          <div className="grow">
            <div className="flex items-center gap-1.5">
              <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
              <p className="text-sm font-semibold">
                {task.activity.display_name}
              </p>
            </div>

            <div className="flex gap-2.5 text-gray-600">
              <div className="flex gap-1 text-xs">
                <ClockIcon className="size-4" />
                <p className="tabular-nums">
                  {secondsToTime(task.activity.exp_seconds)}
                </p>
              </div>
              {task.note && <ChatBubbleLeftEllipsisIcon className="size-4" />}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DeleteTask taskId={task.id} />

          {/* 
          
          TODO: fix This is what is calling the inprogress query on our History. Also:
          
          
          Rendering ScheduledTaskActionBtn on the /scheduled (future-date) list exposes a broken flow: when there is no in-progress task, useStartTask runs but only invalidates/updates scheduledTasksQueryOptions() (today/past scheduled list), not futureTasksQueryOptions(date). For future dates this leaves the started task visible in-place and actionable again until a full reload, so the new page can show stale/incorrect task state after a successful start.
          
          */}

          {/* <ScheduledTaskActionBtn task={task} /> */}
        </div>
      </Card>
    </div>
  );
};
