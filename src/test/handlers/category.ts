import { HttpResponse, http } from "msw";

import { apiRoutes } from "./api-routes";
import { categories } from "../store/categories";

export const categoryHandlers = [
  http.get(apiRoutes.categories, () => {
    return HttpResponse.json(categories, { status: 200 });
  }),

  http.get(apiRoutes.category, ({ params }) => {
    const { categoryId } = params;

    const category = categories.find((c) => c.id === Number(categoryId));

    if (!category)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(category, { status: 200 });
  }),

  http.post(apiRoutes.categories, (req) => {
    return HttpResponse.json(req.params, { status: 201 });
  }),

  http.patch(apiRoutes.category, async ({ params, request }) => {
    const { categoryId } = params;
    const payload = await request.json();

    const category = categories.find((c) => c.id === Number(categoryId));

    if (!category)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    const updatedCategory = {
      ...category,
      ...(typeof payload === "object" ? payload : {}),
    };
    return HttpResponse.json(updatedCategory, { status: 200 });
  }),

  http.delete(apiRoutes.category, ({ params }) => {
    const { categoryId } = params;

    const category = categories.find((c) => c.id === Number(categoryId));

    if (!category)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),
];
