/* eslint-disable max-lines */
import { render, screen, waitFor } from "@/test/test-utils";
import { Suspense } from "react";
import userEvent from "@testing-library/user-event";

import type * as TanStackReactRouter from "@tanstack/react-router";
import type { InProgressTaskAPI } from "@/features/tasks/types/inProgressTask";
import { TimerPanel } from "../TimerPanel";
import type { UserPreference } from "@/features/userPreferences/types/userPreference";
import { activities } from "@/test/store/activities";
import { inProgressTasks } from "@/test/store/tasks";
import { userPreferences } from "@/test/store/userPreferences";

import { HttpResponse, http } from "msw";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

/* Frozen clock: 30m45s after `runningTask.start_time`, 1h activity => 29m15s left. */
const NOW = new Date("2030-01-15T10:30:45.000Z");
const ELAPSED = /00:30:45/;
const REMAINING = /00:29:15/;

const activity = activities[0];
const runningTask: InProgressTaskAPI = {
  ...inProgressTasks[0],
  start_time: "2030-01-15T10:00:00.000Z",
  activity,
};

const setupServer = ({
  running,
  completeStatus = 200,
}: {
  running: boolean;
  completeStatus?: number;
}) => {
  let currentTask: InProgressTaskAPI | null = running ? runningTask : null;
  let preferences: UserPreference[] = userPreferences;
  const startBodies: Record<string, unknown>[] = [];
  const completeBodies: Record<string, unknown>[] = [];
  const preferenceBodies: Record<string, unknown>[] = [];

  server.use(
    http.get(apiRoutes.tasks, ({ request }) => {
      const status = new URL(request.url).searchParams.get(
        "filter[status][eq]",
      );
      const isRunningList = status === TASK_STATUS.IN_PROGRESS;

      return HttpResponse.json(
        isRunningList && currentTask ? [currentTask] : [],
      );
    }),
    http.post(apiRoutes.taskCreateAndStart, async ({ request }) => {
      startBodies.push((await request.json()) as Record<string, unknown>);
      currentTask = runningTask;

      return HttpResponse.json(runningTask, { status: 201 });
    }),
    http.get(apiRoutes.userPreferences, () => HttpResponse.json(preferences)),
    http.patch(apiRoutes.task, async ({ request }) => {
      completeBodies.push((await request.json()) as Record<string, unknown>);

      if (completeStatus !== 200) {
        return HttpResponse.json(
          { message: "Boom" },
          { status: completeStatus },
        );
      }

      currentTask = null;

      return HttpResponse.json({ ...runningTask, ...completeBodies.at(-1) });
    }),
    http.patch(apiRoutes.userPreference, async ({ request, params }) => {
      const body = (await request.json()) as { value: string };
      preferenceBodies.push(body);
      preferences = preferences.map((pref) =>
        pref.key === params.key ? { ...pref, value: body.value } : pref,
      );

      return HttpResponse.json({ ...body });
    }),
  );

  return { startBodies, completeBodies, preferenceBodies };
};

describe("TimerPanel", () => {
  const renderPanel = () =>
    render(
      <Suspense fallback={<p>Loading panel</p>}>
        <TimerPanel />
      </Suspense>,
    );

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts the picked activity and switches from the idle form to the running timer", async () => {
    const user = userEvent.setup();
    const { startBodies } = setupServer({ running: false });
    renderPanel();

    await user.type(
      await screen.findByRole("combobox", { name: "Activities" }),
      activity.display_name,
    );
    await user.click(
      await screen.findByRole("option", { name: activity.display_name }),
    );
    await user.click(screen.getByRole("button", { name: "Start Button" }));

    expect(
      await screen.findByRole("button", { name: "Stop button" }),
    ).toBeInTheDocument();
    expect(screen.getByText(activity.display_name)).toBeInTheDocument();
    expect(
      screen.queryByRole("combobox", { name: "Activities" }),
    ).not.toBeInTheDocument();
    expect(startBodies).toEqual([
      {
        activity_id: activity.id,
        status: TASK_STATUS.IN_PROGRESS,
        start_time: NOW.toISOString(),
      },
    ]);
  });

  it("completes the running task on stop and returns to the idle form", async () => {
    const user = userEvent.setup();
    const { completeBodies } = setupServer({ running: true });
    renderPanel();

    await user.click(
      await screen.findByRole("button", { name: "Stop button" }),
    );

    expect(
      await screen.findByRole("button", { name: "Start Button" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Stop button" }),
    ).not.toBeInTheDocument();
    expect(completeBodies).toHaveLength(1);
    expect(completeBodies[0]).toMatchObject({
      id: runningTask.id,
      status: TASK_STATUS.COMPLETED,
      start_time: runningTask.start_time,
      // Completion rounds the end time to the nearest minute.
      end_time: "2030-01-15T10:31:00.000Z",
    });
  });

  it("keeps the task running and offers a retry when stopping fails", async () => {
    const user = userEvent.setup();
    const { completeBodies } = setupServer({
      running: true,
      completeStatus: 500,
    });
    renderPanel();

    await user.click(
      await screen.findByRole("button", { name: "Stop button" }),
    );

    expect(
      await screen.findByRole("button", { name: "Retry button" }),
    ).toBeInTheDocument();
    expect(screen.getByText(activity.display_name)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Start Button" }),
    ).not.toBeInTheDocument();
    expect(completeBodies).toHaveLength(1);
  });

  it("toggles between elapsed and remaining time and persists the preference", async () => {
    const user = userEvent.setup();
    const { preferenceBodies } = setupServer({ running: true });
    renderPanel();

    const timeBtn = await screen.findByRole("button", {
      name: ELAPSED,
    });

    await user.click(timeBtn);

    expect(
      await screen.findByRole("button", {
        name: REMAINING,
      }),
    ).toBeInTheDocument();
    await waitFor(() => expect(preferenceBodies).toEqual([{ value: "true" }]));

    await user.click(screen.getByRole("button", { name: REMAINING }));

    expect(
      await screen.findByRole("button", {
        name: ELAPSED,
      }),
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(preferenceBodies).toEqual([{ value: "true" }, { value: "false" }]),
    );
  });
});
