import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/timer/$taskId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/timer/$taskId/edit"!</div>;
}
