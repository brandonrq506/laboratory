import { type ResolvedTheme, THEME } from "../types/theme";
import { DEFAULT_THEME, THEMES } from "../constants/theme";

export const isTheme = (value: unknown): value is THEME =>
  THEMES.includes(value as THEME);

export const parseThemePreference = (value: unknown): THEME =>
  isTheme(value) ? value : DEFAULT_THEME;

export const resolveTheme = (
  preference: THEME,
  systemDark: boolean,
): ResolvedTheme => {
  if (preference !== THEME.SYSTEM) return preference;

  return systemDark ? THEME.DARK : THEME.LIGHT;
};
