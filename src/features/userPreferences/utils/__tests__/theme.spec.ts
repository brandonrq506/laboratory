import { parseThemePreference, resolveTheme } from "../theme";

describe("theme preferences", () => {
  it.each(["light", "dark", "system"] as const)("accepts %s", (value) => {
    expect(parseThemePreference(value)).toBe(value);
  });

  it.each([null, undefined, "", "auto", "DARK", {}, 1])(
    "defaults invalid %j to light",
    (value) => {
      expect(parseThemePreference(value)).toBe("light");
    },
  );

  it.each([
    ["light", true, "light"],
    ["dark", false, "dark"],
    ["system", true, "dark"],
    ["system", false, "light"],
  ] as const)(
    "resolves %s with system dark=%s to %s",
    (value, system, expected) => {
      expect(resolveTheme(value, system)).toBe(expected);
    },
  );
});
