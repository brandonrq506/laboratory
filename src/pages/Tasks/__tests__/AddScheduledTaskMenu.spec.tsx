import { HttpResponse, http } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddScheduledTaskMenu } from "../AddScheduledTaskMenu";
import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;

describe("AddScheduledTaskMenu", () => {
  const createTestQueryClient = () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

  const renderAddScheduledTaskMenu = () => {
    const queryClient = createTestQueryClient();

    const utils = render(
      <QueryClientProvider client={queryClient}>
        <AddScheduledTaskMenu />
      </QueryClientProvider>,
    );

    const user = userEvent.setup();

    return { ...utils, user, queryClient };
  };

  it("displays routines list", async () => {
    const { user } = renderAddScheduledTaskMenu();

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });

    await user.click(menuButton);

    expect(screen.getByText("Workout")).toBeInTheDocument();
    expect(screen.getByText("Routines")).toBeInTheDocument();
    expect(screen.getByText("Activities")).toBeInTheDocument();
  });

  it("shows loading indicator when applying routine", async () => {
    const { user } = renderAddScheduledTaskMenu();

    server.use(
      http.post(
        `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`,
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json(null, { status: 201 });
        },
      ),
    );

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });

    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    const routineBtn = screen.getByRole("menuitem", {
      name: "Morning Routine",
    });

    await user.click(routineBtn);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("shows loading indicator only for the clicked routine", async () => {
    const { user } = renderAddScheduledTaskMenu();

    server.use(
      http.post(
        `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`,
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json(null, { status: 201 });
        },
      ),
    );

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });

    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    expect(screen.getByText("Workout")).toBeInTheDocument();

    const routineBtn = screen.getByRole("menuitem", {
      name: "Morning Routine",
    });

    await user.click(routineBtn);

    const loadingIndicator = screen.getAllByRole("status");

    expect(loadingIndicator).toHaveLength(1);
    expect(screen.getByText("Morning")).toBeInTheDocument();
    expect(screen.getByText("Workout")).toBeInTheDocument();
  });

  it("clears loading state on error", async () => {
    const { user } = renderAddScheduledTaskMenu();

    server.use(
      http.post(
        `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`,
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({ error: "Server error" }, { status: 500 });
        },
      ),
    );

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });

    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    const routineBtn = screen.getByRole("menuitem", {
      name: "Morning Routine",
    });

    await user.click(routineBtn);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("hides routines without activities", async () => {
    const { user } = renderAddScheduledTaskMenu();

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });

    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    expect(screen.queryByText("Swimming")).not.toBeInTheDocument();
  });
});
