import { differenceInSeconds, format, parseISO, startOfDay } from "date-fns";

import { SECONDS_PER_PIXEL, TIMELINE_HEIGHT } from "../constants";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { TaskCard } from "./task-card";
import { historyTasksOptions } from "@/features/tasks/api/queryOptions";
import { useQuery } from "@tanstack/react-query";

interface Props {
  date: string;
}

export const DayColumn = ({ date }: Props) => {
  const { data, isPending } = useQuery(
    historyTasksOptions({ date, sort_order: "asc" }),
  );

  const columnDate = parseISO(date);
  const dayLabel = format(columnDate, "EEE").toUpperCase();
  const fullDateLabel = format(columnDate, "MMM d");
  const hasTasks = Boolean(data && data.length > 0);
  const dayStart = startOfDay(columnDate);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.4)]">
      <header className="flex h-16 items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.38em] text-slate-500 uppercase">
          {dayLabel}
        </span>
        <span className="text-xs text-slate-400">{fullDateLabel}</span>
      </header>
      <div className="relative mt-2 flex flex-1 overflow-hidden rounded-xl border border-slate-200/70 bg-white/60">
        <div className="relative w-full" style={{ height: TIMELINE_HEIGHT }}>
          {data?.map((task) => {
            const startOffsetSeconds = differenceInSeconds(
              parseISO(task.start_time),
              dayStart,
            );
            const topOffset = Math.max(
              startOffsetSeconds / SECONDS_PER_PIXEL,
              0,
            );

            return (
              <TaskCard
                key={task.id}
                task={task as CompletedTaskAPI}
                style={{ top: topOffset }}
              />
            );
          })}
        </div>

        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/85 text-xs font-medium text-slate-400">
            Loading tasks...
          </div>
        )}

        {!isPending && !hasTasks && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/85 text-xs font-semibold tracking-[0.3em] text-slate-300 uppercase">
            No Tasks
          </div>
        )}
      </div>
    </article>
  );
};
