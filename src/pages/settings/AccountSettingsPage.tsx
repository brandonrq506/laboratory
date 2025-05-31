import { PageHeader } from "@/components/layout";
import { RemainingTimeToggle } from "@/features/userPreferences/components";

export const AccountSettingsPage = () => {
  return (
    <div>
      <PageHeader title="Account Settings" />
      <br />
      <RemainingTimeToggle />
    </div>
  );
};
