import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { ScheduledTaskList } from "../ScheduledTaskList";
import { activities } from "@/test/store/activities";
import { scheduledTasks } from "@/test/store/tasks";

import { HttpResponse, http } from "msw";
import { TASKS_ENDPOINT } from "@/libs/axios";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;

describe("ScheduledTaskList", () => {
  const setupServer = (tasks: ScheduledTaskAPI[]) => {
    server.use(
      http.get(`${API_URL}/v1${TASKS_ENDPOINT}`, () => {
        return HttpResponse.json(tasks, { status: 200 });
      }),
    );
  };

  const setupCreateTaskServer = () => {
    let requestBody: Record<string, unknown> | null = null;

    server.use(
      http.post(`${API_URL}/v1${TASKS_ENDPOINT}`, async ({ request }) => {
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

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("displays error state when API call fails", async () => {
    const errorMessage = "Failed to fetch tasks";

    server.use(
      http.get(`${API_URL}/v1${TASKS_ENDPOINT}`, () => {
        return HttpResponse.json({ message: errorMessage }, { status: 500 });
      }),
    );

    render(<ScheduledTaskList />);

    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });

    expect(
      screen.getByText("There was an error loading your tasks"),
    ).toBeInTheDocument();
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
        insert_mode: "append",
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
        insert_mode: "prepend",
      });
    });
  });
});
