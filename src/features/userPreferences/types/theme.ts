import type { ObjectValues } from "@/types/core";

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
} as const;

export type THEME = ObjectValues<typeof THEME>;

export type ResolvedTheme = Exclude<THEME, typeof THEME.SYSTEM>;
