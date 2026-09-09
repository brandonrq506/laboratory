import { applyResolvedTheme } from "../utils/applyResolvedTheme";
import { useEffect } from "react";
import { useThemePreference } from "./useThemePreference";

/**
 * Synchronises the document with the resolved theme.
 * Mounted once, at the router root, so the appearance stays correct on every
 * screen — including after signing out, when the cached preferences are gone.
 */
export const useApplyTheme = () => {
  const { resolved } = useThemePreference();

  /*
    No cleanup: the applier is idempotent and resetting on unmount would flash
    the default theme on every StrictMode remount.
  */
  useEffect(() => {
    applyResolvedTheme(resolved);
  }, [resolved]);
};
