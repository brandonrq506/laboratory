import { PropsWithChildren, useCallback, useState } from "react";

import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./AuthContextType";
import { AxiosHeaders } from "axios";
import { apiV1 } from "@/libs/axios";

const KEY = "token";

const getStoredToken = () => localStorage.getItem(KEY);

const setStoredToken = (token: string | null) => {
  if (token) localStorage.setItem(KEY, token);
  else localStorage.removeItem(KEY);
};

const logoutRef: { current: () => void } = {
  current: () => {},
};

let interceptorsRegistered = false;

const ensureAuthInterceptors = () => {
  if (interceptorsRegistered) return;

  apiV1.interceptors.request.use((config) => {
    const token = getStoredToken();
    if (!token) return config;

    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
      return config;
    }

    (config.headers as Record<string, string>).Authorization =
      `Bearer ${token}`;
    return config;
  });

  apiV1.interceptors.response.use(
    (response) => response,
    (error) => {
      const UNAUTHORIZED = 401;
      if (error.response?.status === UNAUTHORIZED) {
        logoutRef.current();
      }
      return Promise.reject(error);
    },
  );

  interceptorsRegistered = true;
};

ensureAuthInterceptors();

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState(getStoredToken());

  const login = useCallback((token: string) => {
    setStoredToken(token);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setStoredToken(null);
    setToken(null);
  }, []);

  const initialAuthState: AuthContextType = {
    isAuth: Boolean(token),
    login,
    logout,
  };

  return <AuthContext value={initialAuthState}>{children}</AuthContext>;
};
