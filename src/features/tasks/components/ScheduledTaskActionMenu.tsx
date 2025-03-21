import { useDisclosure } from "@/hooks";
import { useMoveTaskBottom } from "../api/tanstack/useMoveTaskBottom";
import { useMoveTaskDown } from "../api/tanstack/useMoveTaskDown";
import { useMoveTaskTop } from "../api/tanstack/useMoveTaskTop";
import { useMoveTaskUp } from "../api/tanstack/useMoveTaskUp";
import { useStartTask } from "../api/tanstack/useStartTask";

import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlayIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
  const { mutate: moveTaskUp } = useMoveTaskUp();
  const { mutate: moveTaskTop } = useMoveTaskTop();
  const { mutate: moveTaskDown } = useMoveTaskDown();
  const { mutate: moveTaskBottom } = useMoveTaskBottom();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <ThreeDotsMenu>
        <div className="">
          <MenuItem>
            <button
              onClick={() => startTask(taskId)}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <PlayIcon aria-hidden className="size-4" />
              {START} {TASK}
            </button>
          </MenuItem>
        </div>

        <div className="">
          <MenuItem>
            <button
              onClick={() => moveTaskTop(taskId)}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <ChevronDoubleUpIcon aria-hidden className="size-4" />
              Move Top
            </button>
          </MenuItem>
        </div>

        <div className="">
          <MenuItem>
            <button
              onClick={() => moveTaskUp(taskId)}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <ChevronUpIcon aria-hidden className="size-4" />
              Move Up
            </button>
          </MenuItem>
        </div>

        <div className="">
          <MenuItem>
            <button
              onClick={() => moveTaskDown(taskId)}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <ChevronDownIcon aria-hidden className="size-4" />
              Move Down
            </button>
          </MenuItem>
        </div>

        <div className="">
          <MenuItem>
            <button
              onClick={() => moveTaskBottom(taskId)}
              className="group flex w-full items-center gap-2 px-4 py-2 text-sm text-nowrap text-blue-600 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
              <ChevronDoubleDownIcon aria-hidden className="size-4" />
              Move Bottom
            </button>
          </MenuItem>
        </div>

        <div className="">
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
