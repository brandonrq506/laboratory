import { Button, ConfirmationModal } from "@/components/core";
import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  routineName: string;
  onDelete: () => void;
}

export const ConfirmDeleteRoutineGroupDialog = ({
  isOpen,
  onClose,
  routineName,
  onDelete,
}: Props) => {
  // Optimistic delete: the group leaves the list at once, so close right away.
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      icon="danger"
      title={`${DELETE} ${routineName}`}
      description="Are you sure you want to delete all tasks in this routine?"
      actions={
        <>
          <Button
            variant="danger"
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
