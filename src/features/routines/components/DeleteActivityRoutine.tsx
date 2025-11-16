import { useDeleteActivityRoutine } from "../api/tanstack/useDeleteActivityRoutine";

import { IconButton, Loading } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

import { ACTIVITY, ROUTINE } from "@/constants/entities";
import { DELETE } from "@/constants/actions";

interface Props {
  itemId: number;
  routineId: number;
}

const trashIcon = <TrashIcon className="size-5" aria-hidden />;
const loadingIcon = <Loading className="size-5" />;
const BTN_TEXT = `${DELETE} ${ACTIVITY} ${ROUTINE}`;

export const DeleteActivityRoutine = ({ itemId, routineId }: Props) => {
  const { mutate, isPending } = useDeleteActivityRoutine();

  return (
    <IconButton
      shape="circle"
      aria-label={BTN_TEXT}
      variant="dangerOutline"
      onClick={() => mutate({ itemId, routineId })}>
      {isPending ? loadingIcon : trashIcon}
    </IconButton>
  );
};
