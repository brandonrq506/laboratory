import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";

import { REFRESH_ENDPOINT, apiV1 } from "@/libs/axios";
import {
  initInterceptors,
  setAccessToken,
  setLogoutHandler,
} from "@/libs/auth-interceptors";
import { AuthContext } from "./AuthContext";

initInterceptors();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const hasAttemptedRefresh = useRef(false);

  const login = useCallback((token: string) => {
    setAccessToken(token);
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
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [login]);

  if (isLoading) return null;

  return (
    <AuthContext value={{ isAuth, isLoading, login, logout }}>
      {children}
    </AuthContext>
  );
};
