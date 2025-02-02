import { useDisclosure } from "@/hooks";

import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

import { CATEGORY } from "@/constants/entities";
import { DELETE } from "@/constants/actions";

type Props = {
  categoryId: number;
};

const BTN_TEXT = `${DELETE} ${CATEGORY}`;

export const DeleteCategory = ({ categoryId }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        shape="circle"
        aria-label={BTN_TEXT}
        variant="dangerOutline"
        onClick={onOpen}>
        <TrashIcon className="size-5" aria-hidden />
      </IconButton>

      <DeleteCategoryDialog
        isOpen={isOpen}
        onClose={onClose}
        categoryId={categoryId}
      />
    </>
  );
};
