import { BROWSER_THEME_COLORS } from "../../constants/theme";
import { applyResolvedTheme } from "../applyResolvedTheme";

const root = () => document.documentElement;
const themeColor = () =>
  document.querySelector('meta[name="theme-color"]')?.getAttribute("content");

beforeEach(() => {
  root().className = "";
  root().style.removeProperty("color-scheme");
  document.head.innerHTML = '<meta name="theme-color" content="#f9fafb">';
});

describe("applyResolvedTheme", () => {
  it("marks the document dark", () => {
    applyResolvedTheme("dark");

    expect(root()).toHaveClass("dark");
    expect(root().style.colorScheme).toBe("dark");
    expect(themeColor()).toBe(BROWSER_THEME_COLORS.dark);
  });

  it("clears a previously applied dark appearance", () => {
    applyResolvedTheme("dark");

    applyResolvedTheme("light");

    expect(root()).not.toHaveClass("dark");
    expect(root().style.colorScheme).toBe("light");
    expect(themeColor()).toBe(BROWSER_THEME_COLORS.light);
  });

  it("is idempotent", () => {
    applyResolvedTheme("dark");
    applyResolvedTheme("dark");

    expect(root()).toHaveClass("dark");
    expect(themeColor()).toBe(BROWSER_THEME_COLORS.dark);
  });

  it("survives a missing theme-color meta tag", () => {
    document.head.innerHTML = "";

    expect(() => applyResolvedTheme("dark")).not.toThrow();
    expect(root()).toHaveClass("dark");
  });
});
