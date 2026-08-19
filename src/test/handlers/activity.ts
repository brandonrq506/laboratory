import { HttpResponse, http } from "msw";

import { activities } from "../store/activities";
import { apiRoutes } from "./api-routes";

export const activityHandlers = [
  http.get(apiRoutes.activities, () => {
    return HttpResponse.json(activities, { status: 200 });
  }),

  http.get(apiRoutes.activity, ({ params }) => {
    const { activityId } = params;

    const activity = activities.find((a) => a.id === Number(activityId));

    if (!activity)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(activity, { status: 200 });
  }),

  http.post(apiRoutes.activities, (req) => {
    return HttpResponse.json(req.params, { status: 201 });
  }),

  http.patch(apiRoutes.activity, async ({ params, request }) => {
    const { activityId } = params;
    const payload = await request.json();

    const activity = activities.find((a) => a.id === Number(activityId));

    if (!activity)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    const updatedActivity = {
      ...activity,
      ...(typeof payload === "object" ? payload : {}),
    };
    return HttpResponse.json(updatedActivity, { status: 200 });
  }),

  http.delete(apiRoutes.activity, ({ params }) => {
    const { activityId } = params;

    const activity = activities.find((a) => a.id === Number(activityId));

    if (!activity)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),

  http.options(apiRoutes.activityOptions, () => {
    return HttpResponse.json(null, { status: 204 });
  }),
];
