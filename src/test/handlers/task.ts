import { HttpResponse, delay, http } from "msw";

import {
  completedTasks,
  inProgressTasks,
  scheduledTasks,
} from "../store/tasks";

import { TASK_STATUS } from "@/features/tasks/types/task-status";
import { apiRoutes } from "./api-routes";

export const taskHandlers = [
  http.get(apiRoutes.tasks, ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("filter[status][eq]") ?? "";

    if (status === TASK_STATUS.IN_PROGRESS) {
      return HttpResponse.json(inProgressTasks, { status: 200 });
    } else if (status === TASK_STATUS.COMPLETED) {
      return HttpResponse.json(completedTasks, { status: 200 });
    } else if (status === TASK_STATUS.SCHEDULED) {
      return HttpResponse.json(scheduledTasks, { status: 200 });
    }

    return HttpResponse.json([], { status: 200 });
  }),

  http.get(apiRoutes.task, ({ params }) => {
    const { taskId } = params;

    const task = scheduledTasks.find((t) => t.id === Number(taskId));

    if (!task)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(task, { status: 200 });
  }),

  http.patch(apiRoutes.task, async ({ params, request }) => {
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

  http.delete(apiRoutes.deleteScheduledTasks, async ({ params }) => {
    const { taskId } = params;
    await delay();

    const task = scheduledTasks.find((t) => t.id === Number(taskId));

    if (!task)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),

  http.delete(apiRoutes.task, ({ params }) => {
    const { taskId } = params;

    const task = scheduledTasks.find((t) => t.id === Number(taskId));

    if (!task)
      return HttpResponse.json({ error: "Record not found" }, { status: 404 });

    return HttpResponse.json(null, { status: 204 });
  }),

  http.options(apiRoutes.tasks, () => {
    return HttpResponse.json(null, { status: 204 });
  }),
];
