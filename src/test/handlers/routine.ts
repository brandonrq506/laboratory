import { HttpResponse, http } from "msw";
import { ROUTINES_ENDPOINT } from "@/libs/axios";

import { routines } from "../store/routines";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${ROUTINES_ENDPOINT}`;

export const routineHandlers = [
  http.get(BASE_URL, () => {
    return HttpResponse.json(routines, { status: 200 });
  }),
  http.get(`${BASE_URL}/visible`, () => {
    return HttpResponse.json(
      routines.filter((r) => !r.hidden_at),
      { status: 200 },
    );
  }),
  http.get(`${BASE_URL}/hidden`, () => {
    return HttpResponse.json(
      routines.filter((r) => r.hidden_at),
      { status: 200 },
    );
  }),
  http.get(`${BASE_URL}/:routineId`, ({ params }) => {
    const { routineId } = params;

    const routine = routines.find((r) => r.id === Number(routineId));

    if (!routine)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(routine, { status: 200 });
  }),
  http.post(BASE_URL, (req) => {
    return HttpResponse.json(req.params, { status: 201 });
  }),
  http.post(`${BASE_URL}/:routineId/apply`, () => {
    return HttpResponse.json(null, { status: 201 });
  }),
  http.post(`${BASE_URL}/:routineId/hide`, ({ params }) => {
    const { routineId } = params;

    const routine = routines.find((r) => r.id === Number(routineId));
    if (!routine)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    const updatedRoutine = {
      ...routine,
      hidden_at: new Date().toISOString(),
    };

    return HttpResponse.json(updatedRoutine, { status: 200 });
  }),
  http.post(`${BASE_URL}/:routineId/unhide`, ({ params }) => {
    const { routineId } = params;

    const routine = routines.find((r) => r.id === Number(routineId));
    if (!routine)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    const updatedRoutine = {
      ...routine,
      hidden_at: null,
    };

    return HttpResponse.json(updatedRoutine, { status: 200 });
  }),
  http.patch(`${BASE_URL}/:routineId`, async ({ params, request }) => {
    const { routineId } = params;
    const payload = await request.json();

    const routine = routines.find((r) => r.id === Number(routineId));

    if (!routine)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    const updatedRoutine = {
      ...routine,
      ...(typeof payload === "object" ? payload : {}),
    };
    return HttpResponse.json(updatedRoutine, { status: 200 });
  }),

  http.delete(`${BASE_URL}/:routineId`, ({ params }) => {
    const { routineId } = params;

    const routine = routines.find((r) => r.id === Number(routineId));

    if (!routine)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),
];
