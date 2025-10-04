import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/timer/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/timer/new"!</div>;
}
