import { useDeleteCategory } from "../api/tanstack/useDeleteCategory";

import { Button, ConfirmationModal } from "@/components/core";
import { CANCEL, CONFIRM, DELETE } from "@/constants/actions";
import { CATEGORY } from "@/constants/entities";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  categoryId: number;
};

export const DeleteCategoryDialog = ({
  isOpen,
  onClose,
  onDelete = onClose,
  categoryId,
}: Props) => {
  const { mutate, isPending } = useDeleteCategory();

  const handleDelete = () => {
    mutate(categoryId, {
      onSuccess: () => onDelete(),
    });
  };

  return (
    <ConfirmationModal
      isOpen={isOpen}
      onClose={onClose}
      icon="danger"
      title={`${DELETE} ${CATEGORY}`}
      description="Are you sure you want to delete this category?"
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
