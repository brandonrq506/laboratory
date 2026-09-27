/* eslint-disable max-lines */
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import type * as TanStackReactRouter from "@tanstack/react-router";
import {
  routineApplication,
  scheduledTasks,
  withApplication,
} from "@/test/store/tasks";
import type { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { ScheduledTaskList } from "../ScheduledTaskList";
import { activities } from "@/test/store/activities";

import { HttpResponse, http } from "msw";
import { apiRoutes } from "@/test/handlers/api-routes";
import { server } from "@/test/server";

import { addSeconds } from "date-fns";
import { formatDatetimeTo12hTime } from "@/utils";

import { INSERT_MODE } from "@/features/tasks/types/insert-mode";
import { TASK_STATUS } from "@/features/tasks/types/task-status";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

describe("ScheduledTaskList", () => {
  const setupServer = (tasks: ScheduledTaskAPI[]) => {
    server.use(
      http.get(apiRoutes.tasks, () => {
        return HttpResponse.json(tasks, { status: 200 });
      }),
    );
  };

  const setupCreateTaskServer = () => {
    let requestBody: Record<string, unknown> | null = null;

    server.use(
      http.post(apiRoutes.tasks, async ({ request }) => {
        requestBody = (await request.json()) as Record<string, unknown>;

        return HttpResponse.json(
          { ...scheduledTasks[0], activity: activities[0] },
          { status: 201 },
        );
      }),
    );

    return {
      getRequestBody: () => requestBody,
    };
  };

  it("displays empty state when no tasks are present", async () => {
    setupServer([]);

    render(<ScheduledTaskList />);

    const title = "No Tasks";
    const description = "Get started by creating a new task.";

    expect(await screen.findByText(title)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("displays error state when API call fails", async () => {
    const errorMessage = "Failed to fetch tasks";

    server.use(
      http.get(apiRoutes.tasks, () => {
        return HttpResponse.json({ message: errorMessage }, { status: 500 });
      }),
    );

    render(<ScheduledTaskList />);

    expect(
      await screen.findByText("There was an error loading your tasks"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("toggles insert mode button", async () => {
    setupServer([]);
    const user = userEvent.setup();

    render(<ScheduledTaskList />);

    const appendButton = screen.getByRole("button", {
      name: "Append new tasks",
    });

    expect(appendButton).toHaveAttribute("title", "Append new tasks");
    expect(appendButton).not.toHaveAttribute("aria-pressed");

    await user.click(appendButton);

    const prependButton = screen.getByRole("button", {
      name: "Prepend new tasks",
    });

    expect(prependButton).toHaveAttribute("title", "Prepend new tasks");
    expect(prependButton).not.toHaveAttribute("aria-pressed");
  });

  it("sends append by default and prepend after toggling insert mode", async () => {
    setupServer([]);
    const { getRequestBody } = setupCreateTaskServer();
    const user = userEvent.setup();

    render(<ScheduledTaskList />);

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));

    await waitFor(() => {
      expect(screen.getByText(activities[0].display_name)).toBeInTheDocument();
    });

    await user.click(
      screen.getByRole("menuitem", {
        name: new RegExp(activities[0].display_name),
      }),
    );

    await waitFor(() => {
      expect(getRequestBody()).toEqual({
        activity_id: activities[0].id,
        insert_mode: INSERT_MODE.APPEND,
      });
    });

    await user.click(screen.getByRole("button", { name: "Add Tasks" }));
    await waitFor(() => {
      expect(
        screen.queryByRole("menuitem", {
          name: new RegExp(activities[0].display_name),
        }),
      ).not.toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Append new tasks" }));
    expect(
      screen.getByRole("button", { name: "Prepend new tasks" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add Tasks" }));
    await user.click(
      screen.getByRole("menuitem", {
        name: new RegExp(activities[0].display_name),
      }),
    );

    await waitFor(() => {
      expect(getRequestBody()).toEqual({
        activity_id: activities[0].id,
        insert_mode: INSERT_MODE.PREPEND,
      });
    });
  });
});

const NOW = new Date("2025-05-03T09:00:00.000Z");

describe("ScheduledTaskList with a routine group", () => {
  const [first, second, third, fourth, fifth] = scheduledTasks;
  const plainTasks = [first, second, third];
  const members = [fourth, fifth].map(withApplication);
  const { routine_name } = routineApplication;

  // No in-progress task, so the list starts now and each task follows the previous one.
  const firstMemberStart = formatDatetimeTo12hTime(
    addSeconds(
      NOW,
      plainTasks.reduce((sum, task) => sum + task.activity.exp_seconds, 0),
    ).toISOString(),
  );

  beforeEach(() => {
    // Only Date: faking timers breaks waitFor and MSW.
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
    server.use(
      http.get(apiRoutes.tasks, ({ request }) => {
        const status = new URL(request.url).searchParams.get(
          "filter[status][eq]",
        );
        const tasks =
          status === TASK_STATUS.SCHEDULED ? [...plainTasks, ...members] : [];
        return HttpResponse.json(tasks, { status: 200 });
      }),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders a wrap card with the routine name and the first child's EST", async () => {
    render(<ScheduledTaskList />);

    expect(await screen.findByText(routine_name)).toBeInTheDocument();
    expect(screen.getByText(`${members.length} tasks`)).toBeInTheDocument();
    expect(screen.getByText(firstMemberStart)).toBeInTheDocument();
    expect(
      screen.queryByText(fourth.activity.display_name),
    ).not.toBeInTheDocument();
  });

  it("expanding the wrap shows its children, the first one at the wrap's EST", async () => {
    const user = userEvent.setup();
    render(<ScheduledTaskList />);

    await user.click(
      await screen.findByRole("button", { name: `Expand ${routine_name}` }),
    );

    expect(screen.getByText(fourth.activity.display_name)).toBeInTheDocument();
    expect(screen.getByText(fifth.activity.display_name)).toBeInTheDocument();
    // The wrap and its first child show the same time.
    expect(screen.getAllByText(firstMemberStart)).toHaveLength(2);
  });
});
