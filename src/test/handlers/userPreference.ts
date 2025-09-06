import { HttpResponse, http } from "msw";
import { USER_PREFERENCES_ENDPOINT } from "@/libs/axios";
import { userPreferences } from "../store/userPreferences";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${USER_PREFERENCES_ENDPOINT}`;

export const userPreferenceHandlers = [
  http.get(BASE_URL, () => {
    return HttpResponse.json(userPreferences, { status: 200 });
  }),
];
