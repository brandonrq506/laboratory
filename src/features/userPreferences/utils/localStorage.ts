import type { UserPreference } from "../types/userPreference";

const PREFERENCES_KEY = "preferences";

/**
 * Saves user preferences to local storage
 */
export const savePreferencesToLocalStorage = (
  preferences: UserPreference[],
): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error("Error saving preferences to localStorage:", error);
  }
};

/**
 * Gets user preferences from local storage
 */
export const getPreferencesFromLocalStorage = ():
  UserPreference[] | undefined => {
  try {
    const preferences = localStorage.getItem(PREFERENCES_KEY);
    const parsed: unknown = preferences ? JSON.parse(preferences) : undefined;

    return Array.isArray(parsed) ? (parsed as UserPreference[]) : undefined;
  } catch (error) {
    console.error("Error retrieving preferences from localStorage:", error);
    return undefined;
  }
};

/** Clears the signed-in account's cached preferences. */
export const clearPreferencesFromLocalStorage = () => {
  try {
    localStorage.removeItem(PREFERENCES_KEY);
  } catch {
    /* Browser storage may be unavailable. */
  }
};

/** True when a storage event affects the preferences entry. */
export const isPreferencesStorageEvent = (event: StorageEvent) =>
  event.key === PREFERENCES_KEY || event.key === null;
