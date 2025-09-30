import { useActivateTask } from "../api/tanstack/useActivateTask";
import { useQuery } from "@tanstack/react-query";
import { useStartTask } from "../api/tanstack/useStartTask";

import { ForwardIcon, PlayIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@/components/core";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { inProgressTasksQueryOptions } from "../api/queries";

import { floorMilliseconds } from "@/utils";

interface Props {
  task: ScheduledTaskAPI;
}

export const ScheduledTaskActionBtn = ({ task }: Props) => {
  const { data } = useQuery(inProgressTasksQueryOptions());
  const { mutate: startTask } = useStartTask();
  const { mutate: activateTask } = useActivateTask();

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
