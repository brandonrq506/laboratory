import { UserPreference } from "../types/userPreference";

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
  | UserPreference[]
  | undefined => {
  try {
    const preferences = localStorage.getItem(PREFERENCES_KEY);
    return preferences ? JSON.parse(preferences) : undefined;
  } catch (error) {
    console.error("Error retrieving preferences from localStorage:", error);
    return undefined;
  }
};
