import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { MenuItem } from "@headlessui/react";
import { ThreeDotsMenu } from "@/components/core";

import { DELETE, UPDATE } from "@/constants/actions";
import { Link } from "@tanstack/react-router";
import { ROUTINE } from "@/constants/entities";

import type { RoutineWithItems } from "../types/routine-with-items";

type Props = {
  routine: RoutineWithItems;
};

export const RoutineActionMenu = ({ routine }: Props) => {
  return (
    <ThreeDotsMenu>
      <div className="py-1">
        <MenuItem>
          <Link
            to="/routines/$routineId/edit"
            params={{ routineId: routine.id }}
            className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
            <PencilIcon aria-hidden className="size-4" />
            {UPDATE} {ROUTINE}
          </Link>
        </MenuItem>
      </div>

      <div className="py-1">
        <MenuItem>
          <Link
            to="/routines/$routineId/delete"
            params={{ routineId: routine.id }}
            className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-red-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
            <TrashIcon aria-hidden className="size-4" />
            {DELETE} {ROUTINE}
          </Link>
        </MenuItem>
      </div>
    </ThreeDotsMenu>
  );
};
