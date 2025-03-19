import { useLayoutEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import { AuthContextType } from "./AuthContextType";
import { apiV1 } from "@/libs/axios";

const LS_TOKEN = localStorage.getItem("token");

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isAuth, setIsAuth] = useState(Boolean(LS_TOKEN));

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
  };

  useLayoutEffect(() => {
    const requestInterceptor = apiV1.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptor = apiV1.interceptors.response.use(
      (response) => response,
      (error) => {
        const UNAUTHORIZED = 401;
        if (error.response.status === UNAUTHORIZED) {
          logout();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiV1.interceptors.request.eject(requestInterceptor);
      apiV1.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const initialAuthState: AuthContextType = {
    isAuth,
    login,
    logout,
  };

  return <AuthContext value={initialAuthState}>{children}</AuthContext>;
};
