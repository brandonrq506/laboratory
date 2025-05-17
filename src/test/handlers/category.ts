import { HttpResponse, http } from "msw";
import { CATEGORIES_ENDPOINT } from "@/libs/axios";

import { categories } from "../store/categories";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${CATEGORIES_ENDPOINT}`;

export const categoryHandlers = [
  http.get(BASE_URL, () => {
    return HttpResponse.json(categories, { status: 200 });
  }),

  http.get(`${BASE_URL}/:categoryId`, ({ params }) => {
    const { categoryId } = params;

    const category = categories.find((c) => c.id === Number(categoryId));

    if (!category)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(category, { status: 200 });
  }),

  http.post(BASE_URL, (req) => {
    return HttpResponse.json(req.params, { status: 201 });
  }),

  http.patch(`${BASE_URL}/:categoryId`, async ({ params, request }) => {
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

  http.delete(`${BASE_URL}/:categoryId`, ({ params }) => {
    const { categoryId } = params;

    const category = categories.find((c) => c.id === Number(categoryId));

    if (!category)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),
];
