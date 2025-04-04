import { useDisclosure } from "@/hooks";

import { ActivityAPI } from "../types/activityAPI";
import { DeleteActivityDialog } from "./DeleteActivityDialog";
import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

import { ACTIVITY } from "@/constants/entities";
import { DELETE } from "@/constants/actions";

type Props = {
  activity: ActivityAPI;
};

const BTN_TEXT = `${DELETE} ${ACTIVITY}`;

export const DeleteActivity = ({ activity }: Props) => {
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

      <DeleteActivityDialog
        isOpen={isOpen}
        onClose={onClose}
        activity={activity}
      />
    </>
  );
};
