import { HttpResponse, http } from "msw";

import { routines } from "../store/routines";
import { apiRoutes } from "./api-routes";

export const routineHandlers = [
  http.get(apiRoutes.routines, ({ request }) => {
    const url = new URL(request.url);
    const hiddenAtIsNull = url.searchParams.get("filter[hidden_at][is_null]");

    let result = routines;
    if (hiddenAtIsNull === "true") {
      result = routines.filter((r) => r.hidden_at === null);
    } else if (hiddenAtIsNull === "false") {
      result = routines.filter((r) => r.hidden_at !== null);
    }

    return HttpResponse.json(result, { status: 200 });
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
