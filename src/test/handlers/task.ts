import { HttpResponse, delay, http } from "msw";
import { TASKS_ENDPOINT } from "@/libs/axios";

import {
  completedTasks,
  inProgressTasks,
  scheduledTasks,
} from "../store/tasks";

const API_URL = import.meta.env.VITE_API_URL;

export const taskHandlers = [
  http.get(`${API_URL}/v1${TASKS_ENDPOINT}`, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("filter[status]") ?? "";

    if (status === "in_progress") {
      return HttpResponse.json(inProgressTasks, { status: 200 });
    } else if (status === "completed") {
      return HttpResponse.json(completedTasks, { status: 200 });
    } else if (status === "scheduled") {
      return HttpResponse.json(scheduledTasks, { status: 200 });
    }

    return HttpResponse.json([], { status: 200 });
  }),
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
  http.options(`${API_URL}/v1${TASKS_ENDPOINT}`, () => {
    return HttpResponse.json({}, { status: 204 });
  }),
];
