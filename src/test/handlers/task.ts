import { HttpResponse, delay, http } from "msw";
import { TASKS_ENDPOINT } from "@/libs/axios";

const API_URL = import.meta.env.VITE_API_URL;

export const taskHandlers = [
  http.delete(`${API_URL}/v1${TASKS_ENDPOINT}/delete_scheduled`, async () => {
    await delay();
    return HttpResponse.json({}, { status: 204 });
  }),
  http.delete(`${API_URL}/v1${TASKS_ENDPOINT}/:taskId`, () => {
    return HttpResponse.json({}, { status: 204 });
  }),
];
