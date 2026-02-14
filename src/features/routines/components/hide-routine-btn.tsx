import { useHideRoutine } from "../api/tanstack/use-hide-routine";

import { EyeIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core";

import { HIDE } from "@/constants/actions";
import { ROUTINE } from "@/constants/entities";

const BTN_TEXT = `${HIDE} ${ROUTINE}`;

interface Props {
  routineId: number;
}

export const HideRoutineButton = ({ routineId }: Props) => {
  const { mutate } = useHideRoutine();

  return (
    <IconButton
      shape="square"
      aria-label={BTN_TEXT}
      variant="primaryOutline"
      onClick={() => mutate(routineId)}>
      <EyeIcon className="size-5" aria-hidden />
    </IconButton>
  );
};
