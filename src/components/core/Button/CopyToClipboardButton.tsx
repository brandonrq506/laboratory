import { useState } from "react";
import { useTimeout } from "@/hooks/useTimeout";

import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from "@heroicons/react/24/outline";
import { ERROR_DURATION, SUCCESS_DURATION } from "@/constants/durations";
import { IconButton } from "./IconButton";
import clsx from "clsx";

type Status = "idle" | "copying" | "success" | "error";

const ARIA_LABEL_MAP: Record<Status, string> = {
  idle: "Copy to clipboard",
  copying: "Copying",
  success: "Copied",
  error: "Copy failed",
};

interface Props {
  className?: string;
  onCopy: () => void | string | Promise<void | string>;
}

export const CopyToClipboardButton = ({ className, onCopy }: Props) => {
  const [status, setStatus] = useState<Status>("idle");
  const { start: scheduleReset } = useTimeout(() => setStatus("idle"));

  const isIdle = status === "idle";
  const isCopying = status === "copying";
  const isSuccess = status === "success";
  const isError = status === "error";

  const handleCopy = async () => {
    if (isCopying) return;

    setStatus("copying");
    try {
      await onCopy();
      setStatus("success");
      scheduleReset(SUCCESS_DURATION);
    } catch {
      setStatus("error");
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
