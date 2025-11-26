import { useAuth, useUser } from "@clerk/clerk-react";

export const useClerkAuth = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  return {
    isAuthenticated: isSignedIn,
    user: user
      ? {
          id: user.id,
          username:
            user.username || user.primaryEmailAddress?.emailAddress || "",
          email: user.primaryEmailAddress?.emailAddress || "",
        }
      : null,
    isLoading: !isLoaded,
  };
};
