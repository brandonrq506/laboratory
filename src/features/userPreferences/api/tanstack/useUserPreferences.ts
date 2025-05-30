import { useQuery } from "@tanstack/react-query";

import { USER_PREFERENCES_ENDPOINT } from "@/libs/axios";
import { getUserPreferences } from "../axios/getUserPreferences";

import { millisecondsInMinute } from "date-fns/constants";

const MINUTES = 20;

export const useUserPreferences = () => {
  return useQuery({
    queryKey: [USER_PREFERENCES_ENDPOINT],
    queryFn: getUserPreferences,
    staleTime: MINUTES * millisecondsInMinute,
  });
};
