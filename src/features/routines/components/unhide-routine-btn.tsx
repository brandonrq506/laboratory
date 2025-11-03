import { useUnhideRoutine } from "../api/tanstack/use-unhide-routine";

import { EyeIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core";

import { ROUTINE } from "@/constants/entities";
import { UNHIDE } from "@/constants/actions";

const BTN_TEXT = `${UNHIDE} ${ROUTINE}`;

interface Props {
  routineId: number;
}

export const UnhideRoutineButton = ({ routineId }: Props) => {
  const { mutate } = useUnhideRoutine();

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
