import { useDeleteRoutine } from "../api/tanstack/useDeleteRoutine";

import { Button, ConfirmationModal } from "@/components/core";
import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  routineId: number;
};

export const DeleteRoutineDialog = ({
  isOpen,
  onClose,
  onDelete = onClose,
  routineId,
}: Props) => {
  const { mutate, isPending } = useDeleteRoutine();

  const handleDelete = () => {
    mutate(routineId, {
      onSuccess: () => onDelete(),
    });
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      icon="danger"
      title={`${DELETE} ${ROUTINE}`}
      description="Are you sure you want to delete this routine?"
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
