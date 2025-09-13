import { useApplyRoutine } from "@/features/routines/api/tanstack/useApplyRoutine";

import { Badge, Loading } from "@/components/core";
import { Routine } from "@/features/routines/types/routine";

interface Props {
  routine: Routine;
}

export const RoutineMenuItemContent = ({ routine }: Props) => {
  const { mutate, isPending } = useApplyRoutine();

  const handleApplyRoutine = () => mutate(routine.id);

  return (
    <button
      className="flex w-full items-center justify-between gap-2 px-2 py-1 text-sm font-light data-focus:bg-gray-100"
      aria-label={`Apply ${routine.name} routine`}
      onClick={(e) => {
        e.preventDefault();
        handleApplyRoutine();
      }}>
      <div className="flex items-center gap-2">
        {routine.name}
        {isPending && <Loading sizeStyles="size-4" />}
      </div>
      <Badge color="white">Routine</Badge>
    </button>
  );
};
