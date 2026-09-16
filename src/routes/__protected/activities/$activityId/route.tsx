import { Outlet, createFileRoute } from "@tanstack/react-router";
import { getPageTitle, validateIdParam } from "@/utils";
import { activityByIdQueryOptions } from "@/features/activities/api/queries";

export const Route = createFileRoute("/__protected/activities/$activityId")({
  staticData: { modal: true },
  params: validateIdParam("activityId"),
  loader: ({ context: { queryClient }, params: { activityId } }) =>
    queryClient.query({
      ...activityByIdQueryOptions(activityId),
      staleTime: "static",
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: getPageTitle(loaderData?.display_name ?? "Activity") }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
