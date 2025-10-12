import { Outlet, createFileRoute } from "@tanstack/react-router";
import { routineByIdQueryOptions } from "@/features/routines/api/queries";

export const Route = createFileRoute("/__protected/routines/$routineId")({
  loader: ({ context: { queryClient }, params: { routineId } }) =>
    queryClient.ensureQueryData(routineByIdQueryOptions(routineId)),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
