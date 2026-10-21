import { HttpResponse, http } from "msw";

import { nestableRoutineCandidates, routines } from "../store/routines";
import { apiRoutes } from "./api-routes";

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
  http.get(apiRoutes.routineNestableCandidates, ({ params }) => {
    const { routineId } = params;

    return HttpResponse.json(
      nestableRoutineCandidates.filter(({ id }) => id !== Number(routineId)),
      { status: 200 },
    );
  }),
  http.post(apiRoutes.routines, async ({ request }) => {
    const payload = await request.json();

    return HttpResponse.json(
      { ...routines[0], ...(typeof payload === "object" ? payload : {}) },
      { status: 201 },
    );
  }),
  http.post(apiRoutes.routineApply, () => {
    return HttpResponse.json(null, { status: 201 });
  }),
  http.patch(apiRoutes.routineHide, ({ params }) => {
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
  http.patch(apiRoutes.routineUnhide, ({ params }) => {
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
