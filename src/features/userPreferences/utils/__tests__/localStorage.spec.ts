import {
  getPreferencesFromLocalStorage,
  savePreferencesToLocalStorage,
} from "../localStorage";
import { UserPreference } from "../../types/userPreference";

describe("userPreferences localStorage utils", () => {
  // implementation constant
  const key = "preferences";
  const sample: UserPreference[] = [
    { preference_id: 1, key: "theme", value: "dark" },
  ];

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("saves and retrieves preferences", () => {
    savePreferencesToLocalStorage(sample);
    const stored = localStorage.getItem(key);
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toEqual(sample);
  });

  it("returns undefined when nothing stored", () => {
    expect(getPreferencesFromLocalStorage()).toBeUndefined();
  });

  it("swallows setItem errors and logs", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("fail");
    });
    savePreferencesToLocalStorage(sample);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("swallows getItem errors and logs", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("fail");
    });
    expect(getPreferencesFromLocalStorage()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
