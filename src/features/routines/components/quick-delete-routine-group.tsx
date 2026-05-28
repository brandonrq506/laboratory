import { useDeleteTasks } from "@/features/tasks/api/tanstack/use-delete-tasks";

import { IconButton } from "@/components/core";
import { TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  taskIds: number[];
  routineName: string;
}

export const QuickDeleteRoutineGroup = ({ taskIds, routineName }: Props) => {
  const { mutate } = useDeleteTasks();

  return (
    <IconButton
      variant="dangerOutline"
      onClick={() => mutate({ task_ids: taskIds })}
      aria-label={`Delete ${routineName} routine`}>
      <TrashIcon aria-hidden className="size-5" />
    </IconButton>
  );
};
