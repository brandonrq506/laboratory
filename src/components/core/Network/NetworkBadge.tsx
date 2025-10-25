import { useEffect, useRef, useState } from "react";
import { useOnlineStatus } from "@/hooks";
import { useTimeout } from "@/hooks/useTimeout";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const FIVE_SECONDS = 5000;
const THREE_HUNDRED_MS = 300;

export const NetworkBadge = () => {
  const isOnline = useOnlineStatus();
  const prevOnlineRef = useRef<boolean>(isOnline);

  // Only render when triggered by status changes
  const [shouldRender, setShouldRender] = useState(false);
  // Controls translation for slide in/out
  const [visible, setVisible] = useState(false);

  // Timer to hide badge (slide out)
  const { start: scheduleHide, clear: clearHide } = useTimeout(() =>
    setVisible(false),
  );

  // Timer to unmount after exit animation completes
  const { start: scheduleUnmount, clear: clearUnmount } = useTimeout(() =>
    setShouldRender(false),
  );

  useEffect(() => {
    const wasOnline = prevOnlineRef.current;
    prevOnlineRef.current = isOnline;

    // Clear any pending timers when status changes
    clearHide();
    clearUnmount();

    // online -> offline: mount + show immediately
    if (wasOnline && !isOnline) {
      requestAnimationFrame(() => {
        setShouldRender(true);
        requestAnimationFrame(() => setVisible(true));
      });
      // Wait for offline -> online transition next
      return;
    }

    // offline -> online: ensure shown, then schedule hide & unmount
    if (!wasOnline && isOnline && shouldRender) {
      requestAnimationFrame(() => {
        setVisible(true);
        scheduleHide(FIVE_SECONDS);
        scheduleUnmount(FIVE_SECONDS + THREE_HUNDRED_MS);
      });
    }
  }, [
    isOnline,
    shouldRender,
    clearHide,
    clearUnmount,
    scheduleHide,
    scheduleUnmount,
  ]);

  // Don't render until triggered
  if (!shouldRender) return null;

  // Slide fully off-screen (height + bottom margin) when hidden
  const translateClass = visible
    ? "translate-y-0"
    : "translate-y-[calc(100%_+_1rem)]";

  return (
    <div
      className={clsx(
        "fixed bottom-4 left-1/2 -translate-x-1/2 transform transition-transform duration-300 ease-out",
        translateClass,
      )}
      role="status"
      aria-live="polite">
      <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
        {isOnline ? (
          <CheckCircleIcon className="size-5 animate-pulse text-green-400" />
        ) : (
          <XCircleIcon className="size-5 animate-pulse text-red-400" />
        )}
        <span className="text-xs text-nowrap text-gray-600 transition">
          {isOnline ? "Connection Restored" : "You are Offline"}
        </span>
      </div>
    </div>
  );
};
