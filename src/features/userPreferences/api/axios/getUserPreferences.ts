import { USER_PREFERENCES_ENDPOINT, apiV1 } from "@/libs/axios";
import type { UserPreference } from "../../types/userPreference";

export const getUserPreferences = async (signal?: AbortSignal) => {
  const response = await apiV1.get<UserPreference[]>(
    USER_PREFERENCES_ENDPOINT,
    { signal },
  );
  return response.data;
};
