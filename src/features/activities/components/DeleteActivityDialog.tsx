import { useDeleteActivity } from "../api/tanstack/useDeleteActivity";

import { Button, ConfirmationModal } from "@/components/core";
import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";
import { ACTIVITY } from "@/constants/entities";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  activityId: number;
};

export const DeleteActivityDialog = ({
  isOpen,
  onClose,
  activityId,
}: Props) => {
  const { mutate, isPending } = useDeleteActivity();

  const handleDelete = () => {
    mutate(activityId, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      icon="danger"
      title={`${DELETE} ${ACTIVITY}`}
      description="Are you sure you want to delete this activity?"
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
