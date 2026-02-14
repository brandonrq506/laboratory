import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { REFRESH_ENDPOINT, SESSION_ENDPOINT, apiV1 } from "./axios";

const UNAUTHORIZED = 401;

type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

let accessToken: string | null = null;
let logoutHandler: () => void = () => {};
let isRefreshing = false;
let failedQueue: FailedRequest[] = [];
let initialized = false;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
};

const refreshToken = async (): Promise<string> => {
  const response = await apiV1.post<{ access_token: string }>(REFRESH_ENDPOINT);
  return response.data.access_token;
};

const handleResponseError = async (error: AxiosError) => {
  if (!error.config) return Promise.reject(error);

  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  const shouldSkip =
    error.response?.status !== UNAUTHORIZED ||
    originalRequest._retry ||
    originalRequest.url === REFRESH_ENDPOINT ||
    originalRequest.url === SESSION_ENDPOINT;

  if (shouldSkip) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    originalRequest._retry = true;
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((newToken) => {
      originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
      return apiV1(originalRequest);
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const newToken = await refreshToken();
    accessToken = newToken;
    processQueue(null, newToken);
    originalRequest.headers.set("Authorization", `Bearer ${newToken}`);
    return apiV1(originalRequest);
  } catch (refreshError) {
    processQueue(refreshError, null);
    logoutHandler();
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};

export const initInterceptors = () => {
  if (initialized) return;
  initialized = true;

  apiV1.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
  });

  apiV1.interceptors.response.use((response) => response, handleResponseError);
};

export const resetInterceptors = () => {
  accessToken = null;
  logoutHandler = () => {};
  isRefreshing = false;
  failedQueue = [];
  initialized = false;
};
