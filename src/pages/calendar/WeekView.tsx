import { useEffect, useRef } from "react";

import { Activity, ActivityProps } from "./Activity";

interface WeekEvent {
  id: number;
  start_time: string;
  end_time: string;
  activity: {
    name: string;
    category: { color: string };
  };
}

interface WeekViewProps {
  events: WeekEvent[];
}

export const WeekView = ({ events }: WeekViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // scroll to current time on mount
  useEffect(() => {
    const now = new Date();
    const minutesSince6am = now.getHours() * 60 + now.getMinutes() - 6 * 60;
    if (containerRef.current) {
      containerRef.current.scrollTop = minutesSince6am;
    }
  }, []);

  // helper to turn WeekEvent → ActivityProps
  const mapped: ActivityProps[] = events.map((e) => ({
    id: e.id,
    name: e.activity.name,
    color: e.activity.category.color,
    startTime: new Date(e.start_time),
    endTime: new Date(e.end_time),
  }));

  return (
    <div className="flex h-full">
      {/* Timescale */}
      <div className="w-14 flex-shrink-0 bg-white">
        {Array.from({ length: 18 }).map((_, idx) => {
          const hour = 6 + idx;
          const label =
            hour === 12
              ? "12 PM"
              : hour > 12
                ? `${hour - 12} PM`
                : `${hour} AM`;
          return (
            <div
              key={hour}
              className="h-[60px] border-t border-gray-200 pr-2 text-right text-xs text-gray-500">
              {label}
            </div>
          );
        })}
      </div>

      {/* Day columns + events */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-auto bg-white"
        // 18 hours × 60 px/hour
        style={{ height: 18 * 60 }}>
        {/* Vertical grid lines */}
        <div className="absolute inset-0 grid grid-cols-7 divide-x divide-gray-100">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} />
          ))}
        </div>

        {/* Render activities */}
        {mapped.map((evt) => (
          <Activity key={evt.id} {...evt} />
        ))}
      </div>
    </div>
  );
};
