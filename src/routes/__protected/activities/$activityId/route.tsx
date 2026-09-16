import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  getPageTitle,
  mapApiNotFoundToRouteNotFound,
  validateIdParam,
} from "@/utils";
import { ACTIVITY } from "@/constants/entities";
import { activityByIdQueryOptions } from "@/features/activities/api/queries";

export const Route = createFileRoute("/__protected/activities/$activityId")({
  staticData: { modal: true },
  params: validateIdParam("activityId"),
  loader: ({ context: { queryClient }, params: { activityId } }) =>
    mapApiNotFoundToRouteNotFound(
      queryClient.query({
        ...activityByIdQueryOptions(activityId),
        staleTime: "static",
      }),
      ACTIVITY,
    ),
  head: ({ loaderData }) => ({
    meta: [{ title: getPageTitle(loaderData?.display_name ?? "Activity") }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
