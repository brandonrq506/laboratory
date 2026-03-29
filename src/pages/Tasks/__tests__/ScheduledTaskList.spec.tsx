import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { ScheduledTaskList } from "../ScheduledTaskList";

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

    expect(appendButton).toHaveAttribute("aria-pressed", "false");
    expect(appendButton).toHaveAttribute("title", "Append new tasks");

    await user.click(appendButton);

    const prependButton = screen.getByRole("button", {
      name: "Prepend new tasks",
    });

    expect(prependButton).toHaveAttribute("aria-pressed", "true");
    expect(prependButton).toHaveAttribute("title", "Prepend new tasks");
  });
});
