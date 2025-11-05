import { useDeleteActivity } from "../api/tanstack/useDeleteActivity";

import { Button, ConfirmationModal } from "@/components/core";
import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";
import { ACTIVITY } from "@/constants/entities";

import type { ActivityWithCategory } from "../types/activity-with-category";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  activity: ActivityWithCategory;
};

export const DeleteActivityDialog = ({ isOpen, onClose, activity }: Props) => {
  const { mutate, isPending } = useDeleteActivity();

  const handleDelete = () => {
    mutate(activity.id, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      icon="danger"
      title={`${DELETE} ${ACTIVITY}`}
      description={`Are you sure you want to delete "${activity.display_name}"?`}
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
