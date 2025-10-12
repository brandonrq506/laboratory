import { HeadingLarge, SectionUnderConstruction } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings/notifications")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HeadingLarge title="Notification Settings" />
      <br />
      <SectionUnderConstruction />
    </div>
  );
}
