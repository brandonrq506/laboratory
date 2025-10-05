import { Outlet, createFileRoute } from "@tanstack/react-router";
import { activityByIdQueryOptions } from "@/features/activities/api/queries";

export const Route = createFileRoute("/__protected/activities/$activityId")({
  loader: ({ context: { queryClient }, params: { activityId } }) =>
    queryClient.ensureQueryData(activityByIdQueryOptions(activityId)),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
