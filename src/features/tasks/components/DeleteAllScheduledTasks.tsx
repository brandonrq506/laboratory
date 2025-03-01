import { useDeleteScheduledTasks } from "../api/tanstack/useDeleteScheduledTasks";
import { useDisclosure } from "@/hooks";

import { Button, ConfirmationModal } from "@/components/core";

import { CANCEL, DELETE } from "@/constants/actions";
import { SCHEDULED, TASKS } from "@/constants/entities";

export const DeleteAllScheduledTasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate, isPending } = useDeleteScheduledTasks();

  return (
    <>
      <Button variant="secondary" onClick={onOpen}>
        {`${DELETE} ${SCHEDULED} ${TASKS}`}
      </Button>

      <ConfirmationModal
        isOpen={isOpen}
        onClose={onClose}
        icon="danger"
        title={`${DELETE} ${SCHEDULED} ${TASKS}`}
        description="Are you sure you want to delete all scheduled tasks?"
        actions={
          <>
            <Button
              variant="danger"
              isLoading={isPending}
              onClick={() => mutate()}
              className="inline-flex w-full justify-center sm:ml-3 sm:w-auto">
              {DELETE} {TASKS}
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
