import { useDeleteActivity } from "../api/tanstack/useDeleteActivity";

import { ACTIVITY } from "@/constants/entities";
import { DELETE } from "@/constants/actions";
import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
  activityId: number;
};

const BTN_TEXT = `${DELETE} ${ACTIVITY}`;

export const DeleteActivity = ({ activityId }: Props) => {
  const { mutate } = useDeleteActivity();

  return (
    <IconButton
      shape="circle"
      aria-label={BTN_TEXT}
      variant="dangerOutline"
      onClick={() => mutate(activityId)}>
      <TrashIcon className="size-5" aria-hidden />
    </IconButton>
  );
};
