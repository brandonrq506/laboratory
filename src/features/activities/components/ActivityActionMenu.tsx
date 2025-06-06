import { useDisclosure } from "@/hooks";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react/jsx-runtime";
import { MenuItem } from "@headlessui/react";
import { ThreeDotsMenu } from "@/components/core";

import { DELETE, UPDATE } from "@/constants/actions";
import { ACTIVITY } from "@/constants/entities";
import { ActivityAPI } from "../types/activityAPI";
import { DeleteActivityDialog } from "./DeleteActivityDialog";
import { Link } from "react-router";

type Props = {
  activity: ActivityAPI;
};

export const ActivityActionMenu = ({ activity }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ThreeDotsMenu>
        <div className="py-1">
          <MenuItem>
            <Link
              to={`/activities/edit/${activity.id}`}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <PencilIcon aria-hidden className="size-4" />
              {UPDATE} {ACTIVITY}
            </Link>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => onOpen()}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-red-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <TrashIcon aria-hidden className="size-4" />
              {DELETE} {ACTIVITY}
            </button>
          </MenuItem>
        </div>
      </ThreeDotsMenu>
      <DeleteActivityDialog
        isOpen={isOpen}
        onClose={onClose}
        activity={activity}
      />
    </Fragment>
  );
};
