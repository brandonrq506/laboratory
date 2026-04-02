import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { DeleteTask } from "./DeleteTask";
import { Dot } from "@/components/core";
import { Fragment } from "react/jsx-runtime";

import { getColorByName } from "@/features/colors/utils/getColorByName";
import { secondsToTime } from "@/utils";

import type { ScheduledTaskAPI } from "../types/scheduledTask";

type Props = {
  task: ScheduledTaskAPI;
};

export const FutureScheduledTaskContent = ({ task }: Props) => {
  const color = getColorByName(task.activity.category.color);

  return (
    <Fragment>
      <div className="grow">
        <div className="flex items-center gap-1.5">
          <Dot sizeStyles="size-2" colorStyles={color.fillClass} />
          <p className="text-sm font-semibold">{task.activity.display_name}</p>
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
      <DeleteTask taskId={task.id} />
    </Fragment>
  );
};

/*
TODO: fix This is what is calling the inprogress query on our History. Also:


Rendering ScheduledTaskActionBtn on the /scheduled (future-date) list exposes a broken flow: when there is no in-progress task, useStartTask runs but only invalidates/updates scheduledTasksQueryOptions() (today/past scheduled list), not futureTasksQueryOptions(date). For future dates this leaves the started task visible in-place and actionable again until a full reload, so the new page can show stale/incorrect task state after a successful start.

 <ScheduledTaskActionBtn task={task} /> 
*/
