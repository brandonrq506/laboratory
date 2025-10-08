import { Outlet, createFileRoute } from "@tanstack/react-router";
import { taskByIdQueryOptions } from "@/features/tasks/api/queries";

export const Route = createFileRoute("/__protected/history/$taskId")({
  beforeLoad: ({ context: { queryClient }, params: { taskId } }) =>
    queryClient.ensureQueryData(taskByIdQueryOptions(taskId)),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
