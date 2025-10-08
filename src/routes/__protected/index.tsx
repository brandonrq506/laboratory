import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/")({
  beforeLoad: () => redirect({ to: "/timer" }),
  component: RouteComponent,
});

function RouteComponent() {
  return <div>You should not see this</div>;
}
