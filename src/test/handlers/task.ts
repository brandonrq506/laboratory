import { HttpResponse, delay, http } from "msw";
import { TASKS_ENDPOINT } from "@/libs/axios";

import {
  completedTasks,
  inProgressTasks,
  scheduledTasks,
} from "../store/tasks";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/v1${TASKS_ENDPOINT}`;

export const taskHandlers = [
  http.get(BASE_URL, ({ request }) => {
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

  http.get(`${BASE_URL}/:taskId`, ({ params }) => {
    const { taskId } = params;

    const task = scheduledTasks.find((t) => t.id === Number(taskId));

    if (!task)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(task, { status: 200 });
  }),

  http.patch(`${BASE_URL}/:taskId`, async ({ params, request }) => {
    const { taskId } = params;
    const payload = await request.json();

    const task = scheduledTasks.find((t) => t.id === Number(taskId));

    if (!task)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    const updatedTask = {
      ...task,
      ...(typeof payload === "object" ? payload : {}),
    };
    return HttpResponse.json(updatedTask, { status: 200 });
  }),

  http.delete(`${BASE_URL}/delete_scheduled`, async ({ params }) => {
    const { taskId } = params;
    await delay();

    const task = scheduledTasks.find((t) => t.id === Number(taskId));

    if (!task)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),

  http.delete(`${BASE_URL}/:taskId`, ({ params }) => {
    const { taskId } = params;

    const task = scheduledTasks.find((t) => t.id === Number(taskId));

    if (!task)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),

  http.options(BASE_URL, () => {
    return HttpResponse.json(null, { status: 204 });
  }),
];
