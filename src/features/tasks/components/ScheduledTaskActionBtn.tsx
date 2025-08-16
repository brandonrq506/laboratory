import { useActivateTask } from "../api/tanstack/useActivateTask";
import { useQuery } from "@tanstack/react-query";
import { useStartTask } from "../api/tanstack/useStartTask";

import { ForwardIcon, PlayIcon } from "@heroicons/react/24/outline";
import { IconButton, Loading } from "@/components/core";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { inProgressTaskOptions } from "../api/queryOptions";

import { floorMilliseconds } from "@/utils";

interface Props {
  task: ScheduledTaskAPI;
}

export const ScheduledTaskActionBtn = ({ task }: Props) => {
  const { data } = useQuery(inProgressTaskOptions());
  const { mutate: startTask } = useStartTask();

  // TODO: Remove this `isPending` once I have implemented optimistic updates for this hook
  const { mutate: activateTask, isPending } = useActivateTask();

  const hasInProgress = Boolean(data?.length);

  const handleStartTask = () =>
    startTask({
      ...task,
      status: "in_progress",
      start_time: floorMilliseconds(new Date()).toISOString(),
      position: null,
    });

  const handleActivate = () =>
    activateTask({
      taskId: task.id,
      timestamp: floorMilliseconds(new Date()).toISOString(),
    });

  if (hasInProgress) {
    if (isPending) {
      return (
        <IconButton aria-label="Activating task" disabled>
          <Loading sizeStyles="size-5" />
        </IconButton>
      );
    }

    return (
      <IconButton onClick={handleActivate} aria-label="Activate task">
        <ForwardIcon className="size-5" />
      </IconButton>
    );
  }

  return (
    <IconButton onClick={handleStartTask} aria-label="Start task">
      <PlayIcon className="size-5" />
    </IconButton>
  );
};
