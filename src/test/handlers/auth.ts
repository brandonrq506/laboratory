import { HttpResponse, http } from "msw";
import { apiRoutes } from "./api-routes";

export const authHandlers = [
  http.delete(apiRoutes.session, () => {
    return HttpResponse.json(null, { status: 204 });
  }),
  http.post(apiRoutes.refreshSession, () => {
    return HttpResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 },
    );
  }),
];
