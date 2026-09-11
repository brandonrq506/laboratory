import { BROWSER_THEME_COLORS } from "../../constants/theme";
import { applyResolvedTheme } from "../applyResolvedTheme";

const root = () => document.documentElement;
const themeColor = (theme: keyof typeof BROWSER_THEME_COLORS) =>
  document
    .querySelector(`meta[name="theme-color"][data-theme="${theme}"]`)
    ?.getAttribute("media");

beforeEach(() => {
  root().className = "";
  root().style.removeProperty("color-scheme");
  document.head.innerHTML = `
    <meta name="theme-color" content="${BROWSER_THEME_COLORS.light}" data-theme="light">
    <meta name="theme-color" content="${BROWSER_THEME_COLORS.dark}" data-theme="dark">
  `;
});

describe("applyResolvedTheme", () => {
  it("marks the document dark", () => {
    applyResolvedTheme("dark");

    expect(root()).toHaveClass("dark");
    expect(root().style.colorScheme).toBe("dark");
    expect(themeColor("dark")).toBe("all");
    expect(themeColor("light")).toBe("not all");
  });

  it("clears a previously applied dark appearance", () => {
    applyResolvedTheme("dark");

    applyResolvedTheme("light");

    expect(root()).not.toHaveClass("dark");
    expect(root().style.colorScheme).toBe("light");
    expect(themeColor("light")).toBe("all");
    expect(themeColor("dark")).toBe("not all");
  });

  it("is idempotent", () => {
    applyResolvedTheme("dark");
    applyResolvedTheme("dark");

    expect(root()).toHaveClass("dark");
    expect(themeColor("dark")).toBe("all");
  });

  it("survives a missing theme-color meta tag", () => {
    document.head.innerHTML = "";

    expect(() => applyResolvedTheme("dark")).not.toThrow();
    expect(root()).toHaveClass("dark");
  });
});
