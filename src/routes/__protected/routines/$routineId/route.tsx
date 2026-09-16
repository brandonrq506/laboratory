import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  getPageTitle,
  mapApiNotFoundToRouteNotFound,
  validateIdParam,
} from "@/utils";
import { ROUTINE } from "@/constants/entities";
import { routineByIdQueryOptions } from "@/features/routines/api/queries";

export const Route = createFileRoute("/__protected/routines/$routineId")({
  staticData: { modal: true },
  params: validateIdParam("routineId"),
  loader: ({ context: { queryClient }, params: { routineId } }) =>
    mapApiNotFoundToRouteNotFound(
      queryClient.query({
        ...routineByIdQueryOptions(routineId),
        staleTime: "static",
      }),
      ROUTINE,
    ),
  head: ({ loaderData }) => ({
    meta: [{ title: getPageTitle(loaderData?.name ?? "Routine") }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
