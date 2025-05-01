import { HttpResponse, http } from "msw";
import { ROUTINES_ENDPOINT } from "@/libs/axios";

import { routines } from "../store/routines";

const API_URL = import.meta.env.VITE_API_URL;

export const routineHandlers = [
  http.get(`${API_URL}/v1${ROUTINES_ENDPOINT}`, () => {
    return HttpResponse.json(routines, { status: 200 });
  }),
  http.get(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId`, ({ params }) => {
    const routineId = Number(params.routineId);
    const routine = routines[routineId - 1];
    if (!routine) {
      return HttpResponse.json(
        { message: "Routine not found" },
        { status: 404 },
      );
    }
    return HttpResponse.json(routine, { status: 200 });
  }),
  http.delete(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId`, () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.post(`${API_URL}/v1${ROUTINES_ENDPOINT}`, (req) => {
    return HttpResponse.json(req.params, { status: 201 });
  }),
  http.patch(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId`, () => {
    return HttpResponse.json(routines[0], { status: 200 });
  }),

  http.post(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`, () => {
    return HttpResponse.json({}, { status: 201 });
  }),
];
