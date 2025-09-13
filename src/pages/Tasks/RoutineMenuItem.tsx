import { useApplyRoutine } from "@/features/routines/api/tanstack/useApplyRoutine";

import { Badge, Loading } from "@/components/core";

interface RoutineMenuItemContentProps {
  routine: {
    id: number;
    name: string;
  };
}

export const RoutineMenuItemContent = ({ routine }: RoutineMenuItemContentProps) => {
  const { mutate: applyRoutine, isPending } = useApplyRoutine();

  const handleApplyRoutine = () => {
    applyRoutine(routine.id);
  };

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