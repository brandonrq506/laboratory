import { SignedIn, UserButton } from "@clerk/clerk-react";

export const LogoutButton = () => {
  return (
    <SignedIn>
      <UserButton />
    </SignedIn>
  );
};
