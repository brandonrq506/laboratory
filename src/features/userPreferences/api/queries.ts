import type { UserPreference } from "../types/userPreference";
import { queryOptions } from "@tanstack/react-query";

import { USER_PREFERENCES_ENDPOINT } from "@/libs/axios";
import { getPreferencesFromLocalStorage } from "../utils/localStorage";
import { getUserPreferences } from "./axios/getUserPreferences";

import { millisecondsInMinute } from "date-fns/constants";

const MINUTES = 20;

export const userPreferencesOptions = () => {
  return queryOptions<UserPreference[]>({
    queryKey: [USER_PREFERENCES_ENDPOINT],
    queryFn: ({ signal }) => getUserPreferences(signal),
    staleTime: MINUTES * millisecondsInMinute,
    placeholderData: getPreferencesFromLocalStorage,
  });
};
