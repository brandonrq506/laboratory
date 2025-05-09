import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useOnlineStatus } from "@/hooks";

const FIVE_SECONDS = 5000;
const THREE_HUNDRED_MS = 300;

export const NetworkBadge = () => {
  const isOnline = useOnlineStatus();
  const prevOnlineRef = useRef<boolean>(isOnline);

  // Only render when triggered by status changes
  const [shouldRender, setShouldRender] = useState(false);
  // Controls translation for slide in/out
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wasOnline = prevOnlineRef.current;
    prevOnlineRef.current = isOnline;

    // Trigger on online -> offline
    if (wasOnline && !isOnline) {
      setShouldRender(true);
      // Allow browser to apply initial styles before animating in
      requestAnimationFrame(() => setVisible(true));
    }

    // Trigger on offline -> online
    if (!wasOnline && isOnline && shouldRender) {
      // Already rendered, just ensure visible
      setVisible(true);

      // After 5s, animate out
      const hideTimer = setTimeout(() => setVisible(false), FIVE_SECONDS);
      // After animation, unmount
      const unmountTimer = setTimeout(
        () => setShouldRender(false),
        // display duration + exit animation duration
        FIVE_SECONDS + THREE_HUNDRED_MS,
      );

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [isOnline, shouldRender]);

  // Don't render until triggered
  if (!shouldRender) return null;

  // Slide fully off-screen (height + bottom margin) when hidden
  const translateClass = visible
    ? "translate-y-0"
    : "translate-y-[calc(100%_+_1rem)]";

  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 transform ${translateClass} transition-transform duration-300 ease-out`}
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
