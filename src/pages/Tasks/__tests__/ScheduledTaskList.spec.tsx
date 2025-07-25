import { render, screen, waitFor } from "@/test/test-utils";
import { createRoutesStub } from "react-router";

import { ScheduledTaskAPI } from "@/features/tasks/types/scheduledTask";
import { ScheduledTaskList } from "../ScheduledTaskList";
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

  it("displays delete all button when more than 3 tasks are present", async () => {
    setupServer(scheduledTasks);

    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => <ScheduledTaskList />,
      },
    ]);

    render(<Stub />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /delete scheduled tasks/i }),
      ).toBeInTheDocument();
    });
  });

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
});
