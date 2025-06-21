import { useQuery } from "@tanstack/react-query";
import { useStartTask } from "../api/tanstack/useStartTask";

import { IconButton } from "@/components/core";
import { PlayIcon } from "@heroicons/react/24/outline";
import { ScheduledTaskAPI } from "../types/scheduledTask";
import { inProgressTaskOptions } from "../api/queryOptions";

import { floorMilliseconds } from "@/utils";

interface Props {
  task: ScheduledTaskAPI;
}

export const StartTaskBtn = ({ task }: Props) => {
  const { data } = useQuery(inProgressTaskOptions());
  const { mutate } = useStartTask();

  const inProgressTask = data?.length;

  const handleStartTask = () =>
    mutate({
      ...task,
      status: "in_progress",
      start_time: floorMilliseconds(new Date()).toISOString(),
      position: null,
    });

  return (
    <IconButton
      onClick={handleStartTask}
      disabled={Boolean(inProgressTask)}
      className="disabled:text-gray-400 disabled:hover:text-gray-600">
      <PlayIcon className="size-5" />
      <span className="sr-only">Start task</span>
    </IconButton>
  );
};
