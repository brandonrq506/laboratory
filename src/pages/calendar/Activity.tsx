import { getColorByName } from "@/features/colors/utils/getColorByName";
import clsx from "clsx";
import { differenceInMinutes, format } from "date-fns";

export interface ActivityProps {
  id: number;
  name: string;
  color: string;
  startTime: Date;
  endTime: Date;
}

export const Activity: React.FC<ActivityProps> = ({
  name,
  color,
  startTime,
  endTime,
}) => {
  const duration = differenceInMinutes(endTime, startTime);
  const minutesSince6am =
    startTime.getHours() * 60 + startTime.getMinutes() - 6 * 60; // 6 AM baseline
  const dayIndex = (startTime.getDay() + 6) % 7; // Mon=0 … Sun=6
  const properColor = getColorByName(color);

  // grid positioning
  const top = minutesSince6am; // px
  const height = duration; // px (1 min = 1 px)
  const leftPercent = (dayIndex * 100) / 7; // %
  const widthPercent = 100 / 7; // %

  const showContent = duration > 20;
  const startLabel = format(startTime, "h:mm a");
  const endLabel = format(endTime, "h:mm a");
  const tooltip = `${name}: ${startLabel} – ${endLabel}`;

  return (
    <div
      title={tooltip}
      // only show text when >20 min; otherwise use native tooltip
      className={[
        "absolute rounded-md border px-1 py-0.5 text-xs",
        properColor.bgClass,
        properColor.textClass,
        properColor.borderClass,
      ].join(" ")}
      style={{
        top,
        height,
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
      }}>
      {showContent && (
        <div className={clsx(duration <= 26 && "flex items-center gap-2")}>
          <div className="truncate font-semibold">{name}</div>
          <div className="text-[0.65rem]">
            {startLabel} – {endLabel}
          </div>
        </div>
      )}
    </div>
  );
};
