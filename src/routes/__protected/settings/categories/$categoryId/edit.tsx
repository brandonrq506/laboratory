import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/__protected/settings/categories/$categoryId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/settings/categories/@categoryId/edit"!</div>;
}
