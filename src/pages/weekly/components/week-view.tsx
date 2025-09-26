import { useSearchParams } from "react-router";

import { addDays, format, startOfWeek } from "date-fns";
import { clsx } from "clsx";

import { PIXELS_PER_HOUR, TIMELINE_HEIGHT } from "../constants";
import { DayColumn } from "./day-column";
import { TimeAxis } from "./time-axis";

const MONDAY = 1;
const WEEK_DAYS = 7;

const generateStartOfWeek = (date?: Date) => {
  return startOfWeek(date || new Date(), { weekStartsOn: MONDAY });
};

const getStartOfWeek = (dirtyParam: string | null) => {
  if (!dirtyParam) return generateStartOfWeek();

  const date = new Date(dirtyParam);

  if (isNaN(date.getTime())) return generateStartOfWeek();

  return generateStartOfWeek(date);
};

/*
Responsible for:
- Rendering 7 DayColumn components.
- Renders from Monday to Sunday.
- Determine the beginning of the week based on:
  - There is a week-start query param? Validate if it's in fact a beginning of week.
  - If not, use the current date and find the beginning of current week.
- Pass the corresponding date to each DayColumn component.
*/
export const WeekView = () => {
  const [params] = useSearchParams();

  const weekStartParam = params.get("week-start");

  const startOfWeekDate = getStartOfWeek(weekStartParam);

  return (
    <section
      className={clsx(
        "rounded-3xl border border-slate-200/60 bg-slate-50/90",
        "p-4 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.55)] backdrop-blur",
      )}>
      <div
        className={clsx(
          "grid grid-cols-[88px_repeat(7,minmax(0,1fr))] gap-4",
          "rounded-2xl border border-slate-200/70 bg-white/70 p-2",
          "overflow-auto",
        )}
        style={{
          minHeight: TIMELINE_HEIGHT,
          backgroundImage: `repeating-linear-gradient(180deg, rgba(148, 163, 184, 0.35) 0, rgba(148, 163, 184, 0.35) 1px, transparent 1px, transparent ${PIXELS_PER_HOUR}px)`,
          backgroundPosition: "0px 96px",
        }}>
        <TimeAxis />
        {Array.from({ length: WEEK_DAYS }).map((_, index) => {
          const date = format(addDays(startOfWeekDate, index), "yyyy-MM-dd");
          return <DayColumn key={date} date={date} />;
        })}
      </div>
    </section>
  );
};
