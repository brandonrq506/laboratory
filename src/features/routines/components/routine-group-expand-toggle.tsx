import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core";

interface Props {
  routineApplicationId: number;
  routineName: string;
  expanded: boolean;
  onToggle: (routineApplicationId: number) => void;
}

export const RoutineGroupExpandToggle = ({
  routineApplicationId,
  routineName,
  expanded,
  onToggle,
}: Props) => (
  <IconButton
    aria-label={`${routineName} tasks`}
    aria-expanded={expanded}
    onClick={() => onToggle(routineApplicationId)}>
    {expanded ? (
      <ChevronDownIcon aria-hidden className="size-5" />
    ) : (
      <ChevronRightIcon aria-hidden className="size-5" />
    )}
  </IconButton>
);
