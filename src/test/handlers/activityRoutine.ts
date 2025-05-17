import { ACTIVITIES_ENDPOINT, ROUTINES_ENDPOINT } from "@/libs/axios";
import { HttpResponse, delay, http } from "msw";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId${ACTIVITIES_ENDPOINT}`;

export const activityRoutineHandlers = [
  http.post(`${URL}`, async (req) => {
    await delay();

    return HttpResponse.json(req.params, { status: 201 });
  }),
  http.delete(`${URL}/:activityId`, async () => {
    await delay();

    return HttpResponse.json({}, { status: 204 });
  }),
];
