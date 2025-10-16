import { Outlet, createFileRoute } from "@tanstack/react-router";
import { categoryByIdQueryOptions } from "@/features/categories/api/queries";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId",
)({
  loader: ({ context: { queryClient }, params: { categoryId } }) =>
    queryClient.ensureQueryData(categoryByIdQueryOptions(categoryId)),
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
