import { HttpResponse, http } from "msw";
import { SESSION_ENDPOINT } from "@/libs/axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${SESSION_ENDPOINT}`;

export const authHandlers = [
  http.delete(BASE_URL, () => {
    return HttpResponse.json(null, { status: 204 });
  }),
];
