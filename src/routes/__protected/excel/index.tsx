import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/excel/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/excel/"!</div>;
}
