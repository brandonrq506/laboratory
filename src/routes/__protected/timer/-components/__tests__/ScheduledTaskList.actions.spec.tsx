/* eslint-disable max-lines */
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import type * as TanStackReactRouter from "@tanstack/react-router";
import { inProgressTasks, scheduledTasks } from "@/test/store/tasks";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { ScheduledTaskList } from "../ScheduledTaskList";

import { HttpResponse, http } from "msw";
import { apiRoutes } from "@/test/handlers/api-routes";
import { createDeferred } from "@/test/utils/create-deferred";
import { server } from "@/test/server";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

const NOW = new Date("2025-05-03T09:00:00.000Z");

const setupTasksServer = ({
  scheduled,
  inProgress = [],
}: {
  scheduled: ScheduledTaskAPI[];
  inProgress?: typeof inProgressTasks;
}) => {
  server.use(
    http.get(apiRoutes.tasks, ({ request }) => {
      const status = new URL(request.url).searchParams.get(
        "filter[status][eq]",
      );

      if (status === TASK_STATUS.SCHEDULED)
        return HttpResponse.json(scheduled, { status: 200 });
      if (status === TASK_STATUS.IN_PROGRESS)
        return HttpResponse.json(inProgress, { status: 200 });

      return HttpResponse.json([], { status: 200 });
    }),
  );
};

describe("ScheduledTaskList actions", () => {
  const [first, second] = scheduledTasks;

  beforeEach(() => {
    // Only Date: faking timers breaks waitFor and MSW.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("task action button", () => {
    it("starts the task: sends it as in progress and removes its row before the response", async () => {
      setupTasksServer({ scheduled: [first, second] });

      const response = createDeferred<void>();
      let requestBody: Record<string, unknown> | null = null;
      server.use(
        http.patch(apiRoutes.task, async ({ request }) => {
          requestBody = (await request.json()) as Record<string, unknown>;
          await response.promise;
          return HttpResponse.json({ ...first, ...requestBody });
        }),
      );
      const user = userEvent.setup();

      render(<ScheduledTaskList />);

      const [startFirst] = await screen.findAllByRole("button", {
        name: "Start task",
      });
      await user.click(startFirst);

      await waitFor(() => {
        expect(
          screen.queryByText(first.activity.display_name),
        ).not.toBeInTheDocument();
      });
      expect(screen.getByText(second.activity.display_name)).toBeVisible();
      await waitFor(() => {
        expect(requestBody).toMatchObject({
          id: first.id,
          status: TASK_STATUS.IN_PROGRESS,
          start_time: NOW.toISOString(),
          position: null,
        });
      });

      response.resolve();
    });

    it("activates the task while another is in progress: posts the timestamp and removes its row before the response", async () => {
      setupTasksServer({
        scheduled: [first, second],
        inProgress: inProgressTasks,
      });

      const response = createDeferred<void>();
      let requestBody: Record<string, unknown> | null = null;
      server.use(
        http.post(apiRoutes.taskActivate, async ({ request }) => {
          requestBody = (await request.json()) as Record<string, unknown>;
          await response.promise;
          return HttpResponse.json({});
        }),
      );
      const user = userEvent.setup();

      render(<ScheduledTaskList />);

      expect(
        screen.queryByRole("button", { name: "Start task" }),
      ).not.toBeInTheDocument();

      const [activateFirst] = await screen.findAllByRole("button", {
        name: "Activate task",
      });
      await user.click(activateFirst);

      await waitFor(() => {
        expect(
          screen.queryByText(first.activity.display_name),
        ).not.toBeInTheDocument();
      });
      expect(screen.getByText(second.activity.display_name)).toBeVisible();
      await waitFor(() => {
        expect(requestBody).toEqual({ timestamp: NOW.toISOString() });
      });

      response.resolve();
    });
  });

  describe("delete all scheduled tasks", () => {
    // More than three tasks are needed for the button to show.
    const tasks = scheduledTasks.slice(0, 4);

    const confirmDeletion = async (
      user: ReturnType<typeof userEvent.setup>,
    ) => {
      await user.click(
        await screen.findByRole("button", { name: "Delete Scheduled Tasks" }),
      );
      await user.click(
        await screen.findByRole("button", { name: "Delete Tasks" }),
      );
    };

    it("empties the list before the response", async () => {
      setupTasksServer({ scheduled: tasks });

      const response = createDeferred<void>();
      server.use(
        http.delete(apiRoutes.deleteScheduledTasks, async () => {
          await response.promise;
          return new HttpResponse(null, { status: 204 });
        }),
      );
      const user = userEvent.setup();

      render(<ScheduledTaskList />);

      expect(
        await screen.findByText(tasks[0].activity.display_name),
      ).toBeInTheDocument();

      await confirmDeletion(user);

      expect(await screen.findByText("No Tasks")).toBeInTheDocument();

      response.resolve();
    });

    it("brings the tasks back when the deletion fails", async () => {
      /* Only the first load answers: the refetch after the failure never
         resolves, so the tasks can only come back through the rollback. */
      const refetch = createDeferred<void>();
      let loads = 0;
      server.use(
        http.get(apiRoutes.tasks, async ({ request }) => {
          const status = new URL(request.url).searchParams.get(
            "filter[status][eq]",
          );
          if (status !== TASK_STATUS.SCHEDULED)
            return HttpResponse.json([], { status: 200 });

          loads += 1;
          if (loads > 1) await refetch.promise;
          return HttpResponse.json(tasks, { status: 200 });
        }),
        http.delete(apiRoutes.deleteScheduledTasks, () =>
          HttpResponse.json({ errors: [] }, { status: 500 }),
        ),
      );
      const user = userEvent.setup();

      render(<ScheduledTaskList />);

      expect(
        await screen.findByText(tasks[0].activity.display_name),
      ).toBeInTheDocument();

      await confirmDeletion(user);

      await waitFor(() => {
        expect(loads).toBe(2);
      });
      for (const task of tasks) {
        expect(
          screen.getByText(task.activity.display_name),
        ).toBeInTheDocument();
      }
      expect(screen.queryByText("No Tasks")).not.toBeInTheDocument();

      refetch.resolve();
    });
  });
});
