import { useCompleteTask } from "@/features/tasks/api/tanstack/useCompleteTask";
import { useOnlineStatus } from "@/hooks";

import {
  ArrowPathIcon,
  SlashIcon,
  StopIcon,
  WifiIcon,
} from "@heroicons/react/24/solid";
import { IconButton } from "@/components/core";
import { InProgressTaskAPI } from "@/features/tasks/types/inProgressTask";

import { calculateTimesOnCompletion } from "@/features/timer/utils/calculateTimesOnCompletion";

interface Props {
  task: InProgressTaskAPI;
}

export const RunningTimerButton = ({ task }: Props) => {
  const { mutate, isError } = useCompleteTask();
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <IconButton
        shape="circle"
        variant="primary"
        disabled
        className="relative">
        <span className="sr-only">No Network button</span>
        <WifiIcon aria-hidden className="size-5" />
        <SlashIcon aria-hidden className="absolute inset-0 m-auto size-6" />
      </IconButton>
    );
  }

  return (
    <IconButton
      shape="circle"
      variant="primary"
      onClick={() =>
        mutate({
          ...task,
          status: "completed",
          ...calculateTimesOnCompletion(task.start_time),
        })
      }
      className="relative overflow-visible before:absolute before:-inset-2 before:content-['']">
      <span className="sr-only">{isError ? "Retry" : "Stop"} button</span>
      {!isError && <StopIcon aria-hidden className="size-5" />}
      {isError && <ArrowPathIcon aria-hidden className="size-5" />}
    </IconButton>
  );
};
