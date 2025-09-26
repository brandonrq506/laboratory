import { PIXELS_PER_HOUR, TIMELINE_HEIGHT } from "../constants";

const HOURS_IN_DAY = 24;
const TERMINAL_LABEL_COUNT = 1;
const HOUR_PAD_LENGTH = 2;
const HOUR_PAD_CHARACTER = "0";

const formatHour = (hour: number) =>
  `${hour.toString().padStart(HOUR_PAD_LENGTH, HOUR_PAD_CHARACTER)}:00`;

export const TimeAxis = () => {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-transparent p-4">
      <header className="flex h-16 items-center justify-end">
        <span className="text-xs font-semibold tracking-[0.38em] text-slate-400 uppercase">
          Time
        </span>
      </header>
      <div className="relative mt-2 flex-1">
        <div
          className="relative w-full text-right text-xs font-semibold text-slate-400"
          style={{ height: TIMELINE_HEIGHT }}>
          {Array.from({ length: HOURS_IN_DAY + TERMINAL_LABEL_COUNT }).map(
            (_, hour) => {
              const topOffset = hour * PIXELS_PER_HOUR;
              const label = hour === HOURS_IN_DAY ? "24:00" : formatHour(hour);
              const translate = hour === 0 ? "0" : "-50%";

              return (
                <span
                  key={label}
                  className="absolute right-3 select-none"
                  style={{
                    top: topOffset,
                    transform: `translateY(${translate})`,
                  }}>
                  {label}
                </span>
              );
            },
          )}
        </div>
      </div>
    </article>
  );
};
