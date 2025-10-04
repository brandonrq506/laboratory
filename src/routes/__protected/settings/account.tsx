import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings/account")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/__protected/settings/account"!</div>;
}
