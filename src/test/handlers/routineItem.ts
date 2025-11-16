import { HttpResponse, delay, http } from "msw";
import { ROUTINES_ENDPOINT } from "@/libs/axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/items`;

export const routineItemHandlers = [
  http.post(`${URL}`, async (req) => {
    await delay();

    return HttpResponse.json(req.params, { status: 201 });
  }),
  http.delete(`${URL}/:activityId`, async () => {
    await delay();

    return HttpResponse.json({}, { status: 204 });
  }),
];
