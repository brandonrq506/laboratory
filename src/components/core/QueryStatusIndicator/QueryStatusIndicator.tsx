import { useEffect } from "react";
import { useTimeout } from "@/hooks/useTimeout";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ERROR_DURATION, SUCCESS_DURATION } from "@/constants/durations";
import { Loading } from "@/components/core";
import type { MutationStatus } from "@tanstack/react-query";
import { clsx } from "clsx";

interface Props {
  status: MutationStatus;
  reset: () => void;
  className?: string;
}

export const QueryStatusIndicator = ({ status, reset, className }: Props) => {
  const { start: scheduleReset, clear: clearReset } = useTimeout(reset);

  useEffect(() => {
    if (status === "success") {
      scheduleReset(SUCCESS_DURATION);
    } else if (status === "error") {
      scheduleReset(ERROR_DURATION);
    } else {
      clearReset();
    }
  }, [status, scheduleReset, clearReset]);

  if (status === "idle") return null;

  return (
    <div className={clsx("inline-flex items-center", className)}>
      {status === "pending" && <Loading sizeStyles="size-5" />}
      {status === "success" && (
        <CheckCircleIcon className="size-5 text-green-600" aria-hidden />
      )}
      {status === "error" && (
        <ExclamationCircleIcon
          className="animate-shake size-5 text-red-600"
          aria-hidden
        />
      )}
    </div>
  );
};
