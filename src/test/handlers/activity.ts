import { ACTIVITIES_ENDPOINT, USERS_ENDPOINT } from "@/libs/axios";
import { HttpResponse, http } from "msw";

import { activities } from "../store/activities";

const API_URL = import.meta.env.VITE_API_URL;

export const activityHandlers = [
  http.get(`${API_URL}/v1${USERS_ENDPOINT}/1${ACTIVITIES_ENDPOINT}`, () => {
    return HttpResponse.json(activities, { status: 200 });
  }),
  http.delete(
    `${API_URL}/v1${USERS_ENDPOINT}/1${ACTIVITIES_ENDPOINT}/1`,
    () => {
      return HttpResponse.json({}, { status: 204 });
    },
  ),
];
