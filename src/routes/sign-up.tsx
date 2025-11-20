import { createFileRoute } from "@tanstack/react-router";

import { SignUp } from "@clerk/clerk-react";

// Create a new account
export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp fallbackRedirectUrl="/timer" signInUrl="/sign-in" />
    </div>
  );
}
