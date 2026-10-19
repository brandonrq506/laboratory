import { AxiosError, isAxiosError } from "axios";

const NETWORK_ERROR_CONTENT = {
  kind: "network",
  label: "Connection error",
  title: "We couldn't connect",
  description:
    "Check your internet connection and try again. If you're online, the service may be temporarily unavailable.",
} as const;

const OFFLINE_ERROR_CONTENT = {
  kind: "network",
  label: "No internet connection",
  title: "You're offline",
  description: "Reconnect to the internet and try again.",
} as const;

const UNEXPECTED_ERROR_CONTENT = {
  kind: "unexpected",
  label: "Unexpected error",
  title: "Something went wrong",
  description:
    "An unexpected problem prevented this page from loading. Try again to continue.",
} as const;

export const getRouteErrorPageContent = (error: unknown, isOnline: boolean) => {
  const isNetworkError =
    isAxiosError(error) && error.code === AxiosError.ERR_NETWORK;

  if (!isNetworkError) return UNEXPECTED_ERROR_CONTENT;

  return isOnline ? NETWORK_ERROR_CONTENT : OFFLINE_ERROR_CONTENT;
};
