import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/history/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/history/new"!</div>;
}
