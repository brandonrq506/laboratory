import { Outlet, createFileRoute } from "@tanstack/react-router";
import {
  getPageTitle,
  mapApiNotFoundToRouteNotFound,
  validateIdParam,
} from "@/utils";
import { CATEGORY } from "@/constants/entities";
import { categoryByIdQueryOptions } from "@/features/categories/api/queries";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId",
)({
  staticData: { modal: true },
  params: validateIdParam("categoryId"),
  loader: ({ context: { queryClient }, params: { categoryId } }) =>
    mapApiNotFoundToRouteNotFound(
      queryClient.query({
        ...categoryByIdQueryOptions(categoryId),
        staleTime: "static",
      }),
      CATEGORY,
    ),
  head: ({ loaderData }) => ({
    meta: [{ title: getPageTitle(loaderData?.name ?? "Category") }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
