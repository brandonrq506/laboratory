import { HttpResponse, http } from "msw";

import { apiRoutes } from "./api-routes";
import { routines } from "../store/routines";

export const routineHandlers = [
  http.get(apiRoutes.routines, () => {
    return HttpResponse.json(routines, { status: 200 });
  }),
  http.get(apiRoutes.routine, ({ params }) => {
    const { routineId } = params;

    const routine = routines.find((r) => r.id === Number(routineId));

    if (!routine)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(routine, { status: 200 });
  }),
  http.post(apiRoutes.routines, (req) => {
    return HttpResponse.json(req.params, { status: 201 });
  }),
  http.post(apiRoutes.routineApply, () => {
    return HttpResponse.json(null, { status: 201 });
  }),
  http.post(apiRoutes.routineHide, ({ params }) => {
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
  http.post(apiRoutes.routineUnhide, ({ params }) => {
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
  http.patch(apiRoutes.routine, async ({ params, request }) => {
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

  http.delete(apiRoutes.routine, ({ params }) => {
    const { routineId } = params;

    const routine = routines.find((r) => r.id === Number(routineId));

    if (!routine)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),
];
