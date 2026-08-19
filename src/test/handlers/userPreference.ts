import { HttpResponse, http } from "msw";
import { userPreferences } from "../store/userPreferences";
import { apiRoutes } from "./api-routes";

export const userPreferenceHandlers = [
  http.get(apiRoutes.userPreferences, () => {
    return HttpResponse.json(userPreferences, { status: 200 });
  }),
];
