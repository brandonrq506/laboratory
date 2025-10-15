import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings/")({
  beforeLoad: () => {
    throw redirect({ to: "/settings/account" });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>You should never see this.</div>;
}
