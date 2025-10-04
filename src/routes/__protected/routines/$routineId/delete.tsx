import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/routines/$routineId/delete")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return <div>Hello "/__protected/routines/$routineId/delete"!</div>;
}
