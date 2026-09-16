import { Outlet, createFileRoute } from "@tanstack/react-router";
import { getPageTitle, validateIdParam } from "@/utils";
import { routineByIdQueryOptions } from "@/features/routines/api/queries";

export const Route = createFileRoute("/__protected/routines/$routineId")({
  staticData: { modal: true },
  params: validateIdParam("routineId"),
  loader: ({ context: { queryClient }, params: { routineId } }) =>
    queryClient.query({
      ...routineByIdQueryOptions(routineId),
      staleTime: "static",
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: getPageTitle(loaderData?.name ?? "Routine") }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
