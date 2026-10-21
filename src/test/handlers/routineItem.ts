import { HttpResponse, delay, http } from "msw";
import { apiRoutes } from "./api-routes";

export const routineItemHandlers = [
  http.post(apiRoutes.routineItems, async ({ request }) => {
    await delay();
    const payload = await request.json();

    return HttpResponse.json(payload, { status: 201 });
  }),
  http.patch(apiRoutes.routineItemsMove, async () => {
    await delay();

    return HttpResponse.json({}, { status: 200 });
  }),
  http.delete(apiRoutes.routineItem, async () => {
    await delay();

    return HttpResponse.json({}, { status: 204 });
  }),
];
