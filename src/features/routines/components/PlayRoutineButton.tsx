import { useApplyRoutine } from "@/features/routines/api/tanstack/useApplyRoutine";

import { IconButton } from "@/components/core";
import { PlayIcon } from "@heroicons/react/24/solid";

import { ROUTINE } from "@/constants/entities";
import { UPLOAD } from "@/constants/actions";

const BTN_TEXT = `${UPLOAD} ${ROUTINE}`;

interface Props {
  routineId: number;
}

export const PlayRoutineButton = ({ routineId }: Props) => {
  const { mutate } = useApplyRoutine();

  return (
    <IconButton
      shape="circle"
      aria-label={BTN_TEXT}
      variant="primaryOutline"
      onClick={() => mutate(routineId)}>
      <PlayIcon className="size-5" aria-hidden />
    </IconButton>
  );
};
