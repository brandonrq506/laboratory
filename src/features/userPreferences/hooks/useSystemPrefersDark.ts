import { SYSTEM_THEME_QUERY } from "../constants/theme";
import { useSyncExternalStore } from "react";

/*
  `matchMedia` is resolved lazily on every call so tests can replace it after
  this module is evaluated.
*/
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia?.(SYSTEM_THEME_QUERY);
  media?.addEventListener("change", onChange);

  return () => media?.removeEventListener("change", onChange);
};

const getSnapshot = () =>
  window.matchMedia?.(SYSTEM_THEME_QUERY).matches ?? false;

/** Tracks whether the device is currently asking for a dark appearance. */
export const useSystemPrefersDark = () =>
  useSyncExternalStore(subscribe, getSnapshot);
