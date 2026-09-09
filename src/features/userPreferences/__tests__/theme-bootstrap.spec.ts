import { BROWSER_THEME_COLORS } from "../constants/theme";
import indexHtml from "../../../../index.html?raw";
import { mockSystemTheme } from "@/test/utils/mock-system-theme";
import { savePreferencesToLocalStorage } from "../utils/localStorage";
import { userPreferences } from "@/test/store/userPreferences";

const bootstrap = indexHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1];

const cachePreference = (value: string) =>
  localStorage.setItem(
    "preferences",
    JSON.stringify([{ preference_id: 2, key: "theme", value }]),
  );

let systemTheme: ReturnType<typeof mockSystemTheme>;

beforeEach(() => {
  systemTheme = mockSystemTheme();
  localStorage.clear();
  document.documentElement.className = "";
  document.documentElement.style.removeProperty("color-scheme");
  document.head.innerHTML = '<meta name="theme-color" content="#f9fafb">';
});
afterEach(() => {
  vi.restoreAllMocks();
  systemTheme.restore();
});

describe("actual pre-render HTML bootstrap", () => {
  it.each([
    ["light", true, "light"],
    ["dark", false, "dark"],
    ["system", true, "dark"],
    ["system", false, "light"],
    ["invalid", true, "light"],
  ] as const)(
    "resolves cached %s and system dark=%s to %s before React",
    (cached, system, resolved) => {
      expect(bootstrap).toBeTruthy();
      cachePreference(cached);
      systemTheme.setDark(system);

      window.eval(bootstrap!);

      expect(document.documentElement.classList.contains("dark")).toBe(
        resolved === "dark",
      );
      expect(document.documentElement.style.colorScheme).toBe(resolved);
      expect(
        document.querySelector('meta[name="theme-color"]'),
      ).toHaveAttribute("content", BROWSER_THEME_COLORS[resolved]);
    },
  );

  it.each([
    ["no cached preferences", () => undefined],
    ["malformed json", () => localStorage.setItem("preferences", "{oops")],
    ["a non-array payload", () => localStorage.setItem("preferences", "{}")],
    [
      "preferences without a theme row",
      () =>
        localStorage.setItem(
          "preferences",
          JSON.stringify([
            { preference_id: 1, key: "sidebar_open", value: "true" },
          ]),
        ),
    ],
  ])("renders light given %s", (_, seed) => {
    systemTheme.setDark(true);
    seed();

    window.eval(bootstrap!);

    expect(document.documentElement).not.toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("light");
  });

  it("renders light when reading local storage throws", () => {
    systemTheme.setDark(true);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });

    window.eval(bootstrap!);

    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("reads back what the app persisted", () => {
    savePreferencesToLocalStorage(
      userPreferences.map((pref) =>
        pref.key === "theme" ? { ...pref, value: "dark" } : pref,
      ),
    );

    window.eval(bootstrap!);

    expect(document.documentElement).toHaveClass("dark");
  });
});
