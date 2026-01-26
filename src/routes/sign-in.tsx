import { createFileRoute } from "@tanstack/react-router";

import { SignIn } from "@clerk/clerk-react";

// Login with existing account
export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn fallbackRedirectUrl="/timer" signUpUrl="/sign-up" />
    </div>
  );
}
