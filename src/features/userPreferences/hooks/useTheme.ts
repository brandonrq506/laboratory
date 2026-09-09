import {
  getServerThemePreference,
  getThemePreference,
  isThemeSaving,
  subscribeToTheme,
} from "../stores/theme-store";
import { useSyncExternalStore } from "react";

export const useTheme = () => {
  const preference = useSyncExternalStore(
    subscribeToTheme,
    getThemePreference,
    getServerThemePreference,
  );
  const isSaving = useSyncExternalStore(
    subscribeToTheme,
    isThemeSaving,
    () => false,
  );
  return { preference, isSaving };
};
