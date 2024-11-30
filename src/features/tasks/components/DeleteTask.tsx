import { useDeleteTask } from "../api/tanstack/useDeleteTask";
import { useDisclosure } from "@/hooks";

import { Button, ConfirmationModal, IconButton } from "@/components/core";
import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";
import { TASK } from "@/constants/entities";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  taskId: number;
};

const BTN_TEXT = `${DELETE} ${TASK}`;

export const DeleteTask = ({ taskId }: Props) => {
  const { mutate, isPending } = useDeleteTask();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    mutate(taskId, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <>
      <IconButton
        shape="circle"
        aria-label={BTN_TEXT}
        variant="dangerOutline"
        onClick={onOpen}>
        <TrashIcon className="size-5" aria-hidden />
      </IconButton>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        icon="danger"
        title="Delete Task"
        description="Are you sure you want to delete this task?"
        actions={
          <>
            <Button
              variant="danger"
              isLoading={isPending}
              onClick={handleDelete}
              className="inline-flex w-full justify-center sm:ml-3 sm:w-auto">
              {CONFIRM}
            </Button>
            <Button
              onClick={onClose}
              variant="secondary"
              className="mt-3 inline-flex w-full justify-center sm:mt-0 sm:w-auto">
              {CANCEL}
            </Button>
          </>
        }
      />
    </>
  );
};
