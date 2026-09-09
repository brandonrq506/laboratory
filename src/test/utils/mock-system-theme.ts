import { SYSTEM_THEME_QUERY } from "@/features/userPreferences/constants/theme";

export const mockSystemTheme = (dark = false) => {
  const media = Object.assign(new EventTarget(), {
    matches: dark,
    media: SYSTEM_THEME_QUERY,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  });
  const previous = window.matchMedia;
  window.matchMedia = vi.fn(() => media);
  return {
    restore: () => {
      window.matchMedia = previous;
    },
    setDark: (value: boolean) => {
      media.matches = value;
      media.dispatchEvent(new Event("change"));
    },
  };
};
