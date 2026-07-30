import { useState } from "react";
import { useTimeout } from "@/hooks/useTimeout";

import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { ERROR_DURATION, SUCCESS_DURATION } from "@/constants/durations";
import { IconButton } from "./IconButton";
import clsx from "clsx";

import type { ObjectValues } from "@/types/core";

const STATUS = {
  IDLE: "idle",
  COPYING: "copying",
  SUCCESS: "success",
  ERROR: "error",
} as const;

type Status = ObjectValues<typeof STATUS>;

const ARIA_LABEL_MAP: Record<Status, string> = {
  [STATUS.IDLE]: "Copy to clipboard",
  [STATUS.COPYING]: "Copying",
  [STATUS.SUCCESS]: "Copied",
  [STATUS.ERROR]: "Copy failed",
};

interface Props {
  className?: string;
  onCopy: () => void | string | Promise<void | string>;
}

export const CopyToClipboardButton = ({ className, onCopy }: Props) => {
  const [status, setStatus] = useState<Status>(STATUS.IDLE);
  const { start: scheduleReset } = useTimeout(() => setStatus(STATUS.IDLE));

  const isIdle = status === STATUS.IDLE;
  const isCopying = status === STATUS.COPYING;
  const isSuccess = status === STATUS.SUCCESS;
  const isError = status === STATUS.ERROR;

  const handleCopy = async () => {
    if (isCopying) return;

    setStatus(STATUS.COPYING);
    try {
      await onCopy();
      setStatus(STATUS.SUCCESS);
      scheduleReset(SUCCESS_DURATION);
    } catch {
      setStatus(STATUS.ERROR);
      scheduleReset(ERROR_DURATION);
    }
  };

  const renderIcon = () => {
    if (isSuccess) {
      return (
        <ClipboardDocumentCheckIcon
          className="size-5 text-green-600 transition duration-200 ease-out"
          aria-hidden
        />
      );
    }

    return (
      <ClipboardIcon
        className={clsx("size-5 transition duration-200 ease-out", {
          "text-gray-900": isIdle,
          "text-gray-700": isCopying,
          "animate-shake text-red-600": isError,
        })}
        aria-hidden
      />
    );
  };

  return (
    <IconButton
      className={className}
      onClick={handleCopy}
      aria-label={ARIA_LABEL_MAP[status]}
      disabled={isCopying}>
      {renderIcon()}
      <span className="sr-only" role="status">
        {ARIA_LABEL_MAP[status]}
      </span>
    </IconButton>
  );
};
