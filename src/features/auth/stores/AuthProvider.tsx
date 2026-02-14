import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import { REFRESH_ENDPOINT, apiV1 } from "@/libs/axios";
import { setAccessToken, setLogoutHandler } from "@/libs/auth-interceptors";
import { AuthContext } from "./AuthContext";
import { type AuthLossReason } from "./AuthContextType";
import { Loading } from "@/components/core";

interface AuthProviderProps extends PropsWithChildren {
  onAuthLost?: (reason: AuthLossReason) => Promise<void> | void;
}

let refreshInFlightPromise: Promise<string | null> | null = null;

const getRefreshTokenPromise = () => {
  if (!refreshInFlightPromise) {
    refreshInFlightPromise = apiV1
      .post<{ access_token: string }>(REFRESH_ENDPOINT)
      .then((response) => response.data.access_token)
      .catch(() => null)
      .finally(() => {
        refreshInFlightPromise = null;
      });
  }

  return refreshInFlightPromise;
};

export const AuthProvider = ({ children, onAuthLost }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = useCallback((token: string) => {
    setAccessToken(token);
    setIsAuth(true);
  }, []);

  const logout = useCallback(
    (reason: AuthLossReason = "manual") => {
      setAccessToken(null);
      setIsAuth(false);
      void onAuthLost?.(reason);
    },
    [onAuthLost],
  );

  useEffect(() => {
    setLogoutHandler(() => logout("refresh-failed"));
  }, [logout]);

  useEffect(() => {
    let isMounted = true;

    getRefreshTokenPromise()
      .then((accessToken) => {
        if (!isMounted || !accessToken) return;
        login(accessToken);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
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
