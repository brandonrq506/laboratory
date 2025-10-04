import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/routines/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/routines/new"!</div>;
}
