import { useSearchParams } from "react-router";

import { addDays, format, startOfWeek } from "date-fns";
import { DayColumn } from "./day-column";

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

  const startOfWeek = getStartOfWeek(weekStartParam);

  return (
    <div>
      {Array.from({ length: WEEK_DAYS }).map((_, index) => {
        const date = format(addDays(startOfWeek, index), "yyyy-MM-dd");
        return <DayColumn key={date} date={date} />;
      })}
    </div>
  );
};
