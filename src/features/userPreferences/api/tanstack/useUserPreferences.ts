import { useQuery } from "@tanstack/react-query";

import {
  getPreferencesFromLocalStorage,
  savePreferencesToLocalStorage,
} from "../../utils/localStorage";
import { USER_PREFERENCES_ENDPOINT } from "@/libs/axios";
import { getUserPreferences } from "../axios/getUserPreferences";

import { millisecondsInMinute } from "date-fns/constants";

const MINUTES = 20;

export const useUserPreferences = () => {
  return useQuery({
    queryKey: [USER_PREFERENCES_ENDPOINT],
    queryFn: async () => {
      const data = await getUserPreferences();

      // Save to localStorage whenever we get fresh data from API
      savePreferencesToLocalStorage(data);
      return data;
    },
    staleTime: MINUTES * millisecondsInMinute,
    placeholderData: getPreferencesFromLocalStorage,
  });
};
