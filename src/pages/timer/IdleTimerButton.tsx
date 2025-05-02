import {
  ArrowPathIcon,
  PlayIcon,
  SlashIcon,
  WifiIcon,
} from "@heroicons/react/24/solid";
import { IconButton, Loading } from "@/components/core";

interface Props {
  isError: boolean;
  isOnline: boolean;
  isPending: boolean;
}

// Todo: Provide a retry function. Not possible right now due to start having 1 mutations (Create and Start)
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

  if (isError) {
    return (
      <IconButton
        type="submit"
        shape="circle"
        variant="primary"
        className="relative overflow-visible before:absolute before:-inset-2 before:content-['']">
        <span className="sr-only">Retry button</span>
        <ArrowPathIcon aria-hidden className="size-5" />
      </IconButton>
    );
  }

  return (
    <IconButton
      type="submit"
      shape="circle"
      variant="primary"
      className="relative overflow-visible before:absolute before:-inset-2 before:content-['']">
      <span className="sr-only">Start Button</span>
      <PlayIcon aria-hidden className="size-5" />
    </IconButton>
  );
};
