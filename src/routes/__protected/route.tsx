import { MainLayout } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MainLayout />;
}
