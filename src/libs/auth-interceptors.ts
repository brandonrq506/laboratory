import { AxiosError, InternalAxiosRequestConfig } from "axios";

import { REFRESH_ENDPOINT, apiV1 } from "./axios";

declare module "axios" {
  interface AxiosRequestConfig {
    _retry?: boolean;
    _skipAuthRefresh?: boolean;
  }
}

const UNAUTHORIZED = 401;
const BEARER_PREFIX = "Bearer ";

let accessToken: string | null = null;
let logoutHandler: () => void = () => {};
// A single in-flight refresh shared by every request that 401s concurrently.
let refreshPromise: Promise<string> | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};

/* Single-flight refresh: concurrent callers share one request, so the backend
   rotates tokens exactly once per expiry instead of once per pending request.
   The backend rotates the access token on every refresh, which instantly
   invalidates the previous one — so a second, overlapping refresh would yank a
   just-issued token out from under an in-flight retry and trigger a spurious
   logout. Keeping refresh single-flight removes that race. */
export const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = apiV1
      .post<{ access_token: string }>(REFRESH_ENDPOINT, undefined, {
        _skipAuthRefresh: true,
      })
      .then((res) => {
        accessToken = res.data.access_token;
        return accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const tokenSentWith = (config: InternalAxiosRequestConfig): string | null => {
  const header = config.headers.get("Authorization");
  return typeof header === "string" && header.startsWith(BEARER_PREFIX)
    ? header.slice(BEARER_PREFIX.length)
    : null;
};

const handleResponseError = async (error: AxiosError) => {
  const originalRequest = error.config;

  if (!originalRequest || error.response?.status !== UNAUTHORIZED) {
    return Promise.reject(error);
  }

  /* The refresh/login calls authenticate by other means; never recurse on them.
     Their failure is surfaced to the caller, which decides whether to log out. */
  if (
    originalRequest._skipAuthRefresh ||
    originalRequest.url === REFRESH_ENDPOINT
  ) {
    return Promise.reject(error);
  }

  /* A concurrent refresh already rotated the token after this request was sent.
     Retry with the current token instead of forcing another rotation — this is
     what stops a straggler from invalidating a freshly-issued token. */
  if (
    !originalRequest._retry &&
    accessToken &&
    accessToken !== tokenSentWith(originalRequest)
  ) {
    originalRequest._retry = true;
    originalRequest.headers.set(
      "Authorization",
      `${BEARER_PREFIX}${accessToken}`,
    );
    return apiV1(originalRequest);
  }

  // Already retried with a fresh token and still rejected → genuinely unauthorized.
  if (originalRequest._retry) {
    logoutHandler();
    return Promise.reject(error);
  }

  originalRequest._retry = true;

  try {
    const newToken = await refreshAccessToken();
    originalRequest.headers.set("Authorization", `${BEARER_PREFIX}${newToken}`);
    return apiV1(originalRequest);
  } catch (refreshError) {
    logoutHandler();
    return Promise.reject(refreshError);
  }
};

apiV1.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.set("Authorization", `${BEARER_PREFIX}${accessToken}`);
  }
  return config;
});

apiV1.interceptors.response.use((response) => response, handleResponseError);

export const resetInterceptors = () => {
  accessToken = null;
  logoutHandler = () => {};
  refreshPromise = null;
};
