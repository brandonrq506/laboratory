import { USER_PREFERENCES_ENDPOINT, apiV1 } from "@/libs/axios";
import { UserPreference } from "../../types/userPreference";

export const getUserPreferences = async () => {
  const response = await apiV1.get<UserPreference[]>(USER_PREFERENCES_ENDPOINT);
  return response.data;
};
