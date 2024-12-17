import { useDeleteTask } from "../api/tanstack/useDeleteTask";

import { Button, ConfirmationModal } from "@/components/core";
import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";
import { TASK } from "@/constants/entities";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskId: number;
};

export const DeleteTaskDialog = ({ isOpen, onClose, taskId }: Props) => {
  const { mutate, isPending } = useDeleteTask();

  const handleDelete = () => {
    mutate(taskId, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      icon="danger"
      title={`${DELETE} ${TASK}`}
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
  );
};
