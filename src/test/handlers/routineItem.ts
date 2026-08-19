import { HttpResponse, delay, http } from "msw";
import { apiRoutes } from "./api-routes";

export const routineItemHandlers = [
  http.post(apiRoutes.routineItems, async (req) => {
    await delay();

    return HttpResponse.json(req.params, { status: 201 });
  }),
  http.delete(apiRoutes.routineItem, async () => {
    await delay();

    return HttpResponse.json({}, { status: 204 });
  }),
];
