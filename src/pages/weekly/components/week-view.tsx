import { useSearchParams } from "react-router";

import { addDays, format, startOfWeek } from "date-fns";
import { DayColumn } from "./day-column";
import { clsx } from "clsx";

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
        "p-8 shadow-[0_32px_120px_-48px_rgba(15,23,42,0.55)] backdrop-blur",
      )}>
      <div className="grid grid-cols-7 gap-5">
        {Array.from({ length: WEEK_DAYS }).map((_, index) => {
          const date = format(addDays(startOfWeekDate, index), "yyyy-MM-dd");
          return <DayColumn key={date} date={date} />;
        })}
      </div>
    </section>
  );
};
