import { useTasks } from "@/features/tasks/api/tanstack/useTasks";

import { format, parseISO } from "date-fns";
import { CompletedTaskAPI } from "@/features/tasks/types/completedTask";
import { TaskCard } from "./task-card";

interface Props {
  date: string;
}

export const DayColumn = ({ date }: Props) => {
  const { data, isPending } = useTasks({
    filter: { status: "completed", start_time: date },
    sort: { sort_by: "start_time", sort_order: "asc" },
  });

  const columnDate = parseISO(date);
  const dayLabel = format(columnDate, "EEE").toUpperCase();
  const fullDateLabel = format(columnDate, "MMM d");
  const hasTasks = Boolean(data && data.length > 0);

  return (
    <article className="flex h-full min-h-[720px] flex-col rounded-2xl border border-slate-200/60 bg-white/70 p-4 shadow-[0_18px_60px_-28px_rgba(15,23,42,0.4)]">
      <header className="mb-6 flex items-baseline justify-between">
        <span className="text-xs font-semibold tracking-[0.38em] text-slate-500 uppercase">
          {dayLabel}
        </span>
        <span className="text-xs text-slate-400">{fullDateLabel}</span>
      </header>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden">
        {isPending && (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200/80 bg-white/40 text-xs font-medium text-slate-400">
            Loading tasks...
          </div>
        )}
        {!isPending && hasTasks && (
          <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
            {data!.map((task) => (
              <TaskCard key={task.id} task={task as CompletedTaskAPI} />
            ))}
          </div>
        )}
        {!isPending && !hasTasks && (
          <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200/80 bg-white/40 text-xs font-semibold tracking-[0.3em] text-slate-300 uppercase">
            No Tasks
          </div>
        )}
      </div>
    </article>
  );
};
