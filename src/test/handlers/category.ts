import { HttpResponse, http } from "msw";
import { CATEGORIES_ENDPOINT } from "@/libs/axios";

import { categories } from "../store/categories";

const API_URL = import.meta.env.VITE_API_URL;

export const categoryHandlers = [
  http.get(`${API_URL}/v1${CATEGORIES_ENDPOINT}`, () => {
    return HttpResponse.json(categories, { status: 200 });
  }),
];
