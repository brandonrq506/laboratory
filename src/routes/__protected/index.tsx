import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/")({
  component: RouteComponent,
});

// Make sure we are re-directing to "/timer"
function RouteComponent() {
  return <div>Hello "/__protected/"!</div>;
}
