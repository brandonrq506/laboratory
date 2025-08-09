import {
  ArrowPathIcon,
  PlayIcon,
  SlashIcon,
  WifiIcon,
} from "@heroicons/react/24/solid";
import { IconButton, Loading } from "@/components/core";

/*
This should be implemented like RunningTimerButton once we have optimistic update to start and create task endpoint

Props - IsError: boolean;
isPending - No longer needed
isOnline - Just use "useOnlineStatus" from inside instead of passing it as prop
*/

interface Props {
  isError: boolean;
  isOnline: boolean;
  isPending: boolean;
}

export const IdleTimerButton = ({ isPending, isError, isOnline }: Props) => {
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

  if (isPending) {
    return (
      <IconButton shape="circle" variant="primary" disabled={true}>
        <Loading sizeStyles="size-5" />
      </IconButton>
    );
  }

  return (
    <IconButton
      type="submit"
      shape="circle"
      variant="primary"
      className="relative overflow-visible before:absolute before:-inset-2 before:content-['']">
      <span className="sr-only">{isError ? "Retry" : "Start"} Button</span>
      {!isError && <PlayIcon aria-hidden className="size-5" />}
      {isError && <ArrowPathIcon aria-hidden className="size-5" />}
    </IconButton>
  );
};
