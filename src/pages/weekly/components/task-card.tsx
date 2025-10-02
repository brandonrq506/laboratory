import { CSSProperties } from "react";
import { clsx } from "clsx";

import { differenceInSeconds, format, parseISO } from "date-fns";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { SECONDS_PER_PIXEL } from "../constants";
import { getColorByName } from "@/features/colors/utils/getColorByName";

const MIN_HEIGHT_TO_SHOW_NAME = 30;

interface Props {
  task: CompletedTaskAPI;
  style?: CSSProperties;
}

export const TaskCard = ({ task, style }: Props) => {
  const { activity } = task;
  const durationInSeconds = differenceInSeconds(
    parseISO(task.end_time),
    parseISO(task.start_time),
  );
  const cardHeight = Math.max(durationInSeconds / SECONDS_PER_PIXEL, 0);
  const color = getColorByName(activity.category.color);
  const shouldDisplayName = cardHeight >= MIN_HEIGHT_TO_SHOW_NAME;

  return (
    <div
      style={{ height: cardHeight, ...style }}
      className={clsx(
        "absolute right-0 left-0 flex items-center justify-center overflow-hidden rounded-xl border",
        "text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-200",
        "shadow-[0_12px_32px_-20px_rgba(15,23,42,0.45)]",
        color.bgClass,
        color.textClass,
        color.borderClass,
        shouldDisplayName ? "px-4" : "px-2",
      )}>
      {shouldDisplayName && (
        <div className="text-xs font-light">
          <span className="pointer-events-none text-center text-xs select-none">
            {activity.name}
          </span>
          <section>
            {format(parseISO(task.start_time), "HH:mm")} -{" "}
            {format(parseISO(task.end_time), "HH:mm")}
          </section>
        </div>
      )}
      <span
        className="absolute inset-x-0 bottom-0 h-8 translate-y-6 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
    </div>
  );
};
