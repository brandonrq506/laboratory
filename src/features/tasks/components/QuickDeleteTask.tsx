import { useDeleteTask } from "../api/tanstack/useDeleteTask";

import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

import { DELETE } from "@/constants/actions";
import { TASK } from "@/constants/entities";

interface Props {
  taskId: number;
}

export const QuickDeleteTask = ({ taskId }: Props) => {
  const { mutate } = useDeleteTask();

  return (
    <IconButton variant="dangerOutline" onClick={() => mutate(taskId)}>
      <TrashIcon aria-hidden className="size-5" />
      <span className="sr-only">{`${DELETE} ${TASK}`}</span>
    </IconButton>
  );
};
