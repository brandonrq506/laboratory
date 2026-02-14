import { HttpResponse, http } from "msw";
import { REFRESH_ENDPOINT, SESSION_ENDPOINT } from "@/libs/axios";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${SESSION_ENDPOINT}`;

export const authHandlers = [
  http.delete(BASE_URL, () => {
    return HttpResponse.json(null, { status: 204 });
  }),
  http.post(`${API_URL}/v1${REFRESH_ENDPOINT}`, () => {
    return HttpResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 },
    );
  }),
];
