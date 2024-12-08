import { useCompleteTask } from "@/features/tasks/api/tanstack/useCompleteTask";

import { IconButton } from "@/components/core";
import { InProgressTaskAPI } from "@/features/tasks/types/inProgressTast";
import { StopIcon } from "@heroicons/react/24/solid";
import { TimerTime } from "./TimerTime";

type Props = {
  task: InProgressTaskAPI;
};

export const RunningTimer = ({ task }: Props) => {
  const { mutate } = useCompleteTask();

  return (
    <div className="flex items-center gap-2">
      <div className="w-full">
        <p className="text-sm">{task.activity.name}</p>
        <p className="text-xs">
          {new Date(task.start_time).toLocaleTimeString()}
        </p>
      </div>

      <TimerTime start_time={task.start_time} />

      <IconButton
        variant="primary"
        shape="circle"
        onClick={() => mutate(task.id)}>
        <StopIcon aria-hidden className="size-5" />
      </IconButton>
    </div>
  );
};
