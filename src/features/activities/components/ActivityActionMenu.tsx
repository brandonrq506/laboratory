import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { MenuItem } from "@headlessui/react";
import { ThreeDotsMenu } from "@/components/core";

import { DELETE, UPDATE } from "@/constants/actions";
import { ACTIVITY } from "@/constants/entities";
import { Link } from "@tanstack/react-router";

import type { ActivityWithCategory } from "../types/activity-with-category";

type Props = {
  activity: ActivityWithCategory;
};

export const ActivityActionMenu = ({ activity }: Props) => {
  return (
    <ThreeDotsMenu>
      <div className="py-1">
        <MenuItem>
          <Link
            to="/activities/$activityId/edit"
            params={{ activityId: activity.id }}
            className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
            <PencilIcon aria-hidden className="size-4" />
            {UPDATE} {ACTIVITY}
          </Link>
        </MenuItem>
      </div>

      <div className="py-1">
        <MenuItem>
          <Link
            to="/activities/$activityId/delete"
            params={{ activityId: activity.id }}
            className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-red-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
            <TrashIcon aria-hidden className="size-4" />
            {DELETE} {ACTIVITY}
          </Link>
        </MenuItem>
      </div>
    </ThreeDotsMenu>
  );
};
