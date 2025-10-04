import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/settings"!</div>;
}
