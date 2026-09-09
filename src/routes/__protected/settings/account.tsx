import { ThemeSelect } from "@/features/userPreferences/components/ThemeSelect";
import { userPreferencesOptions } from "@/features/userPreferences/api/queries";

import {
  RemainingTimeToggle,
  SidebarOpenToggle,
} from "@/features/userPreferences/components";
import { HeadingLarge } from "@/components/layout";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__protected/settings/account")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(userPreferencesOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <HeadingLarge title="Account Settings" />
      <br />
      <div className="space-y-6">
        <ThemeSelect />
        <RemainingTimeToggle />
        <SidebarOpenToggle />
      </div>
    </div>
  );
}
