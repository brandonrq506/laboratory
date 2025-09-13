import {
  RemainingTimeToggle,
  SidebarOpenToggle,
} from "@/features/userPreferences/components";
import { HeadingLarge } from "@/components/layout";

export const AccountSettingsPage = () => {
  return (
    <div>
      <HeadingLarge title="Account Settings" />
      <br />
      <div className="space-y-6">
        <RemainingTimeToggle />
        <SidebarOpenToggle />
      </div>
    </div>
  );
};
