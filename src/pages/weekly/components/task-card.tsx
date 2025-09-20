import { differenceInSeconds, parseISO } from "date-fns";
import { clsx } from "clsx";

import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { getColorByName } from "@/features/colors/utils/getColorByName";

const MIN_HEIGHT_TO_SHOW_NAME = 30;
// Each pixel represents 30 seconds
const RATIO = 30;

interface Props {
  task: CompletedTaskAPI;
}

export const TaskCard = ({ task }: Props) => {
  const { activity } = task;
  const durationInSeconds = differenceInSeconds(
    parseISO(task.end_time),
    parseISO(task.start_time),
  );
  const cardHeight = Math.max(durationInSeconds, 0) / RATIO;
  const color = getColorByName(activity.category.color);
  const shouldDisplayName = cardHeight >= MIN_HEIGHT_TO_SHOW_NAME;

  return (
    <div
      style={{ height: cardHeight }}
      className={clsx(
        "relative flex w-full items-center justify-center overflow-hidden rounded-xl border",
        "text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-200",
        "shadow-[0_12px_32px_-20px_rgba(15,23,42,0.45)]",
        color.bgClass,
        color.textClass,
        color.borderClass,
        shouldDisplayName ? "px-4" : "px-2",
      )}>
      {shouldDisplayName && (
        <span className="pointer-events-none text-center text-xs select-none">
          {activity.name}
        </span>
      )}
      <span
        className="absolute inset-x-0 bottom-0 h-8 translate-y-6 rounded-full bg-white/10 blur-2xl"
        aria-hidden
      />
    </div>
  );
};
