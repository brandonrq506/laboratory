import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
  todayCompletedTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { ScheduledTaskList } from "./-components/ScheduledTaskList";
import { TimerPanel } from "@/features/timer/components";
import { TodayCompletedTaskList } from "./-components/TodayCompletedTaskList";
import { getPageTitle } from "@/utils";

export const Route = createFileRoute("/__protected/timer")({
  loader: ({ context: { queryClient } }) => {
    void queryClient.query(inProgressTasksQueryOptions()).catch(() => {});
    void queryClient.query(scheduledTasksQueryOptions()).catch(() => {});
    void queryClient.query(todayCompletedTasksQueryOptions()).catch(() => {});
  },
  component: RouteComponent,
  head: () => ({ meta: [{ title: getPageTitle("Timer") }] }),
});

function RouteComponent() {
  return (
    <div>
      <TimerPanel />
      <br />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ScheduledTaskList />
        <TodayCompletedTaskList />
      </div>
      <Outlet />
    </div>
  );
}
