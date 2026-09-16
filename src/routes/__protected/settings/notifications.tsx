import { HeadingLarge, SectionUnderConstruction } from "@/components/layout";
import { createFileRoute } from "@tanstack/react-router";
import { getPageTitle } from "@/utils";

export const Route = createFileRoute("/__protected/settings/notifications")({
  head: () => ({ meta: [{ title: getPageTitle("Notification Settings") }] }),
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
