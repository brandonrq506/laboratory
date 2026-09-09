import { type ResolvedTheme, THEME } from "../types/theme";

export const DEFAULT_THEME: THEME = THEME.LIGHT;

export const THEMES: readonly THEME[] = [THEME.LIGHT, THEME.DARK, THEME.SYSTEM];

export const THEME_STORAGE_KEY = "theme";

export const SYSTEM_THEME_QUERY = "(prefers-color-scheme: dark)";

export const THEME_OPTIONS = [
  { label: "Light", value: THEME.LIGHT },
  { label: "Dark", value: THEME.DARK },
  { label: "System", value: THEME.SYSTEM },
] satisfies { label: string; value: THEME }[];

// Keep in sync with the background tokens and the pre-render HTML bootstrap.
export const BROWSER_THEME_COLORS = {
  [THEME.LIGHT]: "#f9fafb",
  [THEME.DARK]: "#030712",
} satisfies Record<ResolvedTheme, string>;
