import { Outlet, createFileRoute } from "@tanstack/react-router";
import { getPageTitle, validateIdParam } from "@/utils";
import { categoryByIdQueryOptions } from "@/features/categories/api/queries";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId",
)({
  staticData: { modal: true },
  params: validateIdParam("categoryId"),
  loader: ({ context: { queryClient }, params: { categoryId } }) =>
    queryClient.query({
      ...categoryByIdQueryOptions(categoryId),
      staleTime: "static",
    }),
  head: ({ loaderData }) => ({
    meta: [{ title: getPageTitle(loaderData?.name ?? "Category") }],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
