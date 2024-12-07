import { useDeleteActivity } from "../api/tanstack/useDeleteActivity";

import { Button, ConfirmationModal, IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";
import { ACTIVITY } from "@/constants/entities";
import { useDisclosure } from "@/hooks";

type Props = {
  activityId: number;
};

const BTN_TEXT = `${DELETE} ${ACTIVITY}`;

export const DeleteActivity = ({ activityId }: Props) => {
  const { mutate, isPending } = useDeleteActivity();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = () => {
    mutate(activityId, {
      onSuccess: () => {
        onClose();
      },
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
        title="Delete Activity"
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
    </>
  );
};
