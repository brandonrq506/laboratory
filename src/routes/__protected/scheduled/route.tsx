import { Outlet, createFileRoute } from "@tanstack/react-router";

import { DateFilter } from "@/components/core/Date";
import { FutureScheduledTaskList } from "@/pages/Tasks/future-scheduled-task-list";
import { HeadingLarge } from "@/components/layout";
import { ScheduledTaskListActions } from "@/pages/Tasks/ScheduledTaskListActions";

import { futureTasksQueryOptions } from "@/features/tasks/api/queries";
import { redirectScheduledPastDate } from "@/utils/taskDateRouting";
import { validateDateSearch } from "@/utils/search";

type ScheduledSearch = {
  date: string;
};

export const Route = createFileRoute("/__protected/scheduled")({
  validateSearch: (search): ScheduledSearch => {
    return validateDateSearch(search.date as string | undefined);
  },
  loaderDeps: ({ search: { date } }) => ({ date }),
  beforeLoad: ({ search: { date } }) => redirectScheduledPastDate(date),
  loader: ({ context: { queryClient }, deps: { date } }) =>
    queryClient.ensureQueryData(futureTasksQueryOptions(date)),
  component: RouteComponent,
});

function RouteComponent() {
  const { date } = Route.useSearch();

  return (
    <div>
      <HeadingLarge title="Tasks" />

      <div className="mb-2 flex w-full items-center justify-between">
        <DateFilter
          label="Date Filter"
          hideLabel
          className="w-full"
          value={date}
        />
        <ScheduledTaskListActions scheduledAt={date} />
      </div>
      <FutureScheduledTaskList />
      <Outlet />
    </div>
  );
}
