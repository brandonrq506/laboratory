import type { UserPreference } from "@/features/userPreferences/types/userPreference";
import { userPreferences } from "../store/userPreferences";

import { HttpResponse, http } from "msw";
import { apiRoutes } from "./api-routes";

export const mockUserPreferencesResponse = (preferences: UserPreference[]) =>
  HttpResponse.json(preferences);

export const userPreferenceHandlers = [
  http.get(apiRoutes.userPreferences, () =>
    mockUserPreferencesResponse(userPreferences),
  ),
];
