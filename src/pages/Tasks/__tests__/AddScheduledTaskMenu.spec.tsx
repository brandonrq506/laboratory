import { HttpResponse, http } from "msw";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { AddScheduledTaskMenu } from "../AddScheduledTaskMenu";
import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;

describe("AddScheduledTaskMenu", () => {
  it("displays routines list", async () => {
    const user = userEvent.setup();

    render(<AddScheduledTaskMenu />);

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });
    
    await user.click(menuButton);

    expect(screen.getByText("Workout")).toBeInTheDocument();
    expect(screen.getByText("Routines")).toBeInTheDocument();
    expect(screen.getByText("Activities")).toBeInTheDocument();
  });

  it("shows loading indicator when applying routine", async () => {
    const user = userEvent.setup();

    server.use(
      http.post(
        `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`,
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          return HttpResponse.json(null, { status: 201 });
        },
      ),
    );

    render(<AddScheduledTaskMenu />);

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    const morningRoutineButton = screen.getByLabelText("Apply Morning routine");

    await user.click(morningRoutineButton);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("shows loading indicator only for the clicked routine", async () => {
    const user = userEvent.setup();

    // Create a delayed response
    server.use(
      http.post(
        `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`,
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          return HttpResponse.json(null, { status: 201 });
        },
      ),
    );

    render(<AddScheduledTaskMenu />);

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    expect(screen.getByText("Workout")).toBeInTheDocument();

    const morningButton = screen.getByLabelText("Apply Morning routine");

    await user.click(morningButton);

    const loadingIndicator = screen.getAllByRole("status");

    expect(loadingIndicator).toHaveLength(1);
    expect(screen.getByText("Morning")).toBeInTheDocument();
    expect(screen.getByText("Workout")).toBeInTheDocument();

    // Wait for the loading to complete
    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it("clears loading state on error", async () => {
    const user = userEvent.setup();

    server.use(
      http.post(
        `${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`,
        async () => {
          await new Promise((resolve) => setTimeout(resolve, 10));
          return HttpResponse.json({ error: "Server error" }, { status: 500 });
        },
      ),
    );

    render(<AddScheduledTaskMenu />);

    const menuButton = screen.getByRole("button", { name: "Add Tasks" });

    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    const morningButton = screen.getByLabelText("Apply Morning routine");

    await user.click(morningButton);

    expect(screen.getByRole("status")).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });
});
