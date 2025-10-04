import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/settings/notifications"!</div>;
}
