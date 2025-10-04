import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/history")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p>Hello "/__protected/history"!</p>
      <Outlet />
    </div>
  );
}
