import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Link, getRouteApi } from "@tanstack/react-router";
import { DeleteTask } from "./DeleteTask";
import { Dot } from "@/components/core";
import { Fragment } from "react/jsx-runtime";

import { getColorByName } from "@/features/colors/utils/getColorByName";
import { secondsToTime } from "@/utils";

import type { ScheduledTaskAPI } from "../types/scheduledTask";

const routeApi = getRouteApi("/__protected/scheduled");

type Props = {
  task: ScheduledTaskAPI;
};

export const FutureScheduledTaskContent = ({ task }: Props) => {
  const { date } = routeApi.useSearch();
  const color = getColorByName(task.activity.category.color);

  return (
    <Fragment>
      <Link
        className="grow"
        to="/scheduled/$taskId"
        params={{ taskId: task.id }}
        search={{ date }}>
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
      </Link>
      <DeleteTask taskId={task.id} />
    </Fragment>
  );
};
