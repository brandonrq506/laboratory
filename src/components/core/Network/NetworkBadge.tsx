import { useEffect, useRef, useState } from "react";
import { useOnlineStatus } from "@/hooks";
import { useTimeout } from "@/hooks/useTimeout";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { NOTIFICATION_DURATION } from "@/constants/durations";
import clsx from "clsx";

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
        scheduleHide(NOTIFICATION_DURATION);
        scheduleUnmount(NOTIFICATION_DURATION + THREE_HUNDRED_MS);
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

  // Slide fully off-screen (height + bottom offset incl. safe-area) when hidden
  const translateClass = visible
    ? "translate-y-0"
    : "translate-y-[calc(100%+--spacing(4)+env(safe-area-inset-bottom))]";

  return (
    <div
      className={clsx(
        "bottom-safe-4 fixed left-1/2 -translate-x-1/2 transform transition-transform duration-300 ease-out",
        translateClass,
      )}
      role="status"
      aria-live="polite">
      <div className="bg-surface flex items-center gap-2 rounded-full px-4 py-2 shadow-lg">
        {isOnline ? (
          <CheckCircleIcon className="text-success-indicator size-5 animate-pulse" />
        ) : (
          <XCircleIcon className="text-danger-indicator size-5 animate-pulse" />
        )}
        <span className="text-foreground-muted text-xs text-nowrap transition">
          {isOnline ? "Connection Restored" : "You are Offline"}
        </span>
      </div>
    </div>
  );
};
