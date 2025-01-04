import { useDisclosure } from "@/hooks";

import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

import { DELETE } from "@/constants/actions";
import { TASK } from "@/constants/entities";

type Props = {
  taskId: number;
};

const BTN_TEXT = `${DELETE} ${TASK}`;

export const DeleteTask = ({ taskId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        shape="circle"
        aria-label={BTN_TEXT}
        variant="dangerOutline"
        onClick={(e) => {
          e.preventDefault();
          onOpen();
        }}>
        <TrashIcon className="size-5" aria-hidden />
      </IconButton>

      <DeleteTaskDialog isOpen={isOpen} onClose={onClose} taskId={taskId} />
    </>
  );
};
