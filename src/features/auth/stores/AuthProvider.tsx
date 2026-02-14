import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { REFRESH_ENDPOINT, apiV1 } from "@/libs/axios";
import { setAccessToken, setLogoutHandler } from "@/libs/auth-interceptors";
import { AuthContext } from "./AuthContext";
import { Loading } from "@/components/core";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasAttemptedRefresh = useRef(false);

  const login = useCallback((accessToken: string) => {
    setAccessToken(accessToken);
    setIsAuth(true);
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setIsAuth(false);
  }, []);

  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  useEffect(() => {
    if (hasAttemptedRefresh.current) return;
    hasAttemptedRefresh.current = true;

    apiV1
      .post<{ access_token: string }>(REFRESH_ENDPOINT)
      .then((res) => login(res.data.access_token))
      .catch((error: unknown) => {
        if (import.meta.env.DEV) {
          console.error("Initial token refresh failed:", error);
        }
      })
      .finally(() => setIsLoading(false));
  }, [login]);

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
