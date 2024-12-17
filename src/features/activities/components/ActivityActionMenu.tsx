import { useDisclosure } from "@/hooks";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react/jsx-runtime";
import { MenuItem } from "@headlessui/react";
import { ThreeDotsMenu } from "@/components/core";

import { DELETE, UPDATE } from "@/constants/actions";
import { ACTIVITY } from "@/constants/entities";
import { DeleteActivityDialog } from "./DeleteActivityDialog";
import { Link } from "react-router";

type Props = {
  activityId: number;
};

export const ActivityActionMenu = ({ activityId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ThreeDotsMenu>
        <div className="py-1">
          <MenuItem>
            <Link
              to={`/activities/edit/${activityId}`}
              className="group flex w-full items-center gap-2 text-nowrap px-4 py-2 text-sm text-blue-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
              <PencilIcon aria-hidden className="size-4" />
              {UPDATE} {ACTIVITY}
            </Link>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => onOpen()}
              className="group flex w-full items-center gap-2 text-nowrap px-4 py-2 text-sm text-red-600 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none">
              <TrashIcon aria-hidden className="size-4" />
              {DELETE} {ACTIVITY}
            </button>
          </MenuItem>
        </div>
      </ThreeDotsMenu>
      <DeleteActivityDialog
        isOpen={isOpen}
        onClose={onClose}
        activityId={activityId}
      />
    </Fragment>
  );
};
