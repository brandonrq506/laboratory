import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/history/$taskId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/history/$taskId"!</div>;
}
