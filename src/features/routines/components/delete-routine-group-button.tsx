import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  routineName: string;
  onClick: () => void;
}

export const DeleteRoutineGroupButton = ({ routineName, onClick }: Props) => (
  <IconButton
    variant="dangerOutline"
    onClick={onClick}
    aria-label={`Delete ${routineName} routine`}>
    <TrashIcon aria-hidden className="size-5" />
  </IconButton>
);
