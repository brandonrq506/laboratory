import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  inProgressTasksQueryOptions,
  scheduledTasksQueryOptions,
  todayCompletedTasksQueryOptions,
} from "@/features/tasks/api/queries";
import { ScheduledTaskList } from "@/pages/Tasks/ScheduledTaskList";
import { TimerPanel } from "@/features/timer/components";
import { TodayCompletedTaskList } from "@/pages/Tasks/TodayCompletedTaskList";

export const Route = createFileRoute("/__protected/timer")({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    void queryClient.query(inProgressTasksQueryOptions()).catch(() => {});
    void queryClient.query(scheduledTasksQueryOptions()).catch(() => {});
    void queryClient.query(todayCompletedTasksQueryOptions()).catch(() => {});
  },
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
