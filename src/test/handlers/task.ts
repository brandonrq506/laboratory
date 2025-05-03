import { HttpResponse, delay, http } from "msw";
import { TASKS_ENDPOINT } from "@/libs/axios";

import { completedTasks } from "../store/tasks";

const API_URL = import.meta.env.VITE_API_URL;

export const taskHandlers = [
  http.delete(`${API_URL}/v1${TASKS_ENDPOINT}/delete_scheduled`, async () => {
    await delay();
    return HttpResponse.json({}, { status: 204 });
  }),
  http.delete(`${API_URL}/v1${TASKS_ENDPOINT}/:taskId`, () => {
    return HttpResponse.json({}, { status: 204 });
  }),
  http.patch(`${API_URL}/v1${TASKS_ENDPOINT}/:taskId`, () => {
    return HttpResponse.json(completedTasks[0], { status: 200 });
  }),
];
