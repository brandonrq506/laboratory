import { Outlet, createFileRoute } from "@tanstack/react-router";
import { activityByIdQueryOptions } from "@/features/activities/api/queries";
import { validateIdParam } from "@/utils";

export const Route = createFileRoute("/__protected/activities/$activityId")({
  staticData: { modal: true },
  params: validateIdParam("activityId"),
  loader: ({ context: { queryClient }, params: { activityId } }) =>
    queryClient.ensureQueryData(activityByIdQueryOptions(activityId)),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
