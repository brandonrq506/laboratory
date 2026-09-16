import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  getPageTitle,
  mapApiNotFoundToRouteNotFound,
  validateIdParam,
} from "@/utils";
import { TASK } from "@/constants/entities";
import { taskByIdQueryOptions } from "@/features/tasks/api/queries";

export const Route = createFileRoute("/__protected/history/$taskId")({
  staticData: { modal: true },
  params: validateIdParam("taskId"),
  loader: ({ context: { queryClient }, params: { taskId } }) =>
    mapApiNotFoundToRouteNotFound(
      queryClient.query({
        ...taskByIdQueryOptions(taskId),
        staleTime: "static",
      }),
      TASK,
    ),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: getPageTitle(loaderData?.activity.display_name || "Task"),
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
