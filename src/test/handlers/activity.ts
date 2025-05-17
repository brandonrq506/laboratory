import { HttpResponse, http } from "msw";
import { ACTIVITIES_ENDPOINT } from "@/libs/axios";

import { activities } from "../store/activities";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${ACTIVITIES_ENDPOINT}`;

export const activityHandlers = [
  http.get(BASE_URL, () => {
    return HttpResponse.json(activities, { status: 200 });
  }),

  http.get(`${BASE_URL}/:activityId`, ({ params }) => {
    const { activityId } = params;

    const activity = activities.find((a) => a.id === Number(activityId));

    if (!activity)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(activity, { status: 200 });
  }),

  http.post(BASE_URL, (req) => {
    return HttpResponse.json(req.params, { status: 201 });
  }),

  http.patch(`${BASE_URL}/:activityId`, async ({ params, request }) => {
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

  http.delete(`${BASE_URL}/:activityId`, ({ params }) => {
    const { activityId } = params;

    const activity = activities.find((a) => a.id === Number(activityId));

    if (!activity)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),

  http.options(`${BASE_URL}/*`, () => {
    return HttpResponse.json(null, { status: 204 });
  }),
];
