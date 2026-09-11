import { type ResolvedTheme, THEME } from "../types/theme";
import { THEME_COLOR_SELECTOR } from "../constants/theme";

/**
 * Applies the resolved theme to the document.
 * Idempotent, so a StrictMode double invoke is harmless.
 */
export const applyResolvedTheme = (resolved: ResolvedTheme) => {
  const root = document.documentElement;

  root.classList.toggle(THEME.DARK, resolved === THEME.DARK);
  /*
    The pre-paint script sets this inline, where it beats the `:root.dark` rule.
    It must be kept in sync or native controls keep the previous scheme.
  */
  root.style.colorScheme = resolved;

  document
    .querySelectorAll<HTMLMetaElement>(THEME_COLOR_SELECTOR)
    .forEach((meta) => {
      meta.setAttribute(
        "media",
        meta.dataset.theme === resolved ? "all" : "not all",
      );
    });
};
