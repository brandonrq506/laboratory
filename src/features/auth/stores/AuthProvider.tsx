import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  refreshAccessToken,
  setAccessToken,
  setLogoutHandler,
} from "@/libs/auth-interceptors";
import { AuthContext } from "./AuthContext";
import { Loading } from "@/components/core";
import { clearPreferencesFromLocalStorage } from "@/features/userPreferences/utils/localStorage";
import { queryClient } from "@/libs/tanstack-query/query-client";
import { userPreferencesOptions } from "@/features/userPreferences/api/queries";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasAttemptedRefresh = useRef(false);

  const login = useCallback((accessToken: string) => {
    /* Drop the previous account's cached preferences before this one loads. */
    queryClient.removeQueries(userPreferencesOptions());
    clearPreferencesFromLocalStorage();
    setAccessToken(accessToken);
    setIsAuth(true);
  }, []);

  const logout = useCallback(() => {
    /*
      The cached blob is deliberately kept so the sign-in screen still paints the
      last theme before React loads. `login` clears it for the next account.
    */
    queryClient.removeQueries(userPreferencesOptions());
    setAccessToken(null);
    setIsAuth(false);
  }, []);

  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  useEffect(() => {
    if (hasAttemptedRefresh.current) return;
    hasAttemptedRefresh.current = true;

    refreshAccessToken()
      .then(() => setIsAuth(true))
      .catch((error: unknown) => {
        if (import.meta.env.DEV && import.meta.env.MODE !== "test") {
          console.error("Initial token refresh failed:", error);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading sizeStyles="size-10" />
      </div>
    );

  return (
    <AuthContext value={{ isAuth, isLoading, login, logout }}>
      {children}
    </AuthContext>
  );
};
