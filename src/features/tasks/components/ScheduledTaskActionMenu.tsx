import { useDisclosure } from "@/hooks";
import { useStartTask } from "../api/tanstack/useStartTask";

import { PlayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { Fragment } from "react/jsx-runtime";
import { MenuItem } from "@headlessui/react";
import { ThreeDotsMenu } from "@/components/core";

import { DELETE, START } from "@/constants/actions";
import { TASK } from "@/constants/entities";

type Props = {
  taskId: number;
};

export const ScheduledTaskActionMenu = ({ taskId }: Props) => {
  const { mutate: startTask } = useStartTask();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ThreeDotsMenu>
        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => startTask(taskId)}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <PlayIcon aria-hidden className="size-4" />
              {START} {TASK}
            </button>
          </MenuItem>
        </div>

        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => onOpen()}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-red-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <TrashIcon aria-hidden className="size-4" />
              {DELETE} {TASK}
            </button>
          </MenuItem>
        </div>
      </ThreeDotsMenu>
      <DeleteTaskDialog isOpen={isOpen} onClose={onClose} taskId={taskId} />
    </Fragment>
  );
};
