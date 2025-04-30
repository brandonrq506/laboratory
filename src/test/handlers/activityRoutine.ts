import { ACTIVITIES_ENDPOINT, ROUTINES_ENDPOINT } from "@/libs/axios";
import { HttpResponse, delay, http } from "msw";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId${ACTIVITIES_ENDPOINT}/:activityId`;

export const activityRoutineHandlers = [
  http.delete(URL, async () => {
    await delay();

    return HttpResponse.json({}, { status: 204 });
  }),
];
