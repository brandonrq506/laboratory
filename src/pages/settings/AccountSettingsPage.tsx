import {
  RemainingTimeToggle,
  SidebarOpenToggle,
} from "@/features/userPreferences/components";
import { PageHeader } from "@/components/layout";

export const AccountSettingsPage = () => {
  return (
    <div>
      <PageHeader title="Account Settings" />
      <br />
      <div className="space-y-6">
        <RemainingTimeToggle />
        <SidebarOpenToggle />
      </div>
    </div>
  );
};
