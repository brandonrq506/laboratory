import { Outlet, createFileRoute } from "@tanstack/react-router";
import { getPageTitle, validateIdParam } from "@/utils";
import { taskByIdQueryOptions } from "@/features/tasks/api/queries";

export const Route = createFileRoute("/__protected/scheduled/$taskId")({
  staticData: { modal: true },
  params: validateIdParam("taskId"),
  loader: ({ context: { queryClient }, params: { taskId } }) =>
    queryClient.query({
      ...taskByIdQueryOptions(taskId),
      staleTime: "static",
    }),
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
