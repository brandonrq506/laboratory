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

    // Click the menu button to open the menu
    const menuButton = screen.getByRole("button", { name: "Add Tasks" });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });
    
    expect(screen.getByText("Workout")).toBeInTheDocument();
    expect(screen.getByText("Routines")).toBeInTheDocument();
    expect(screen.getByText("Activities")).toBeInTheDocument();
  });

  it("shows loading indicator when applying routine", async () => {
    const user = userEvent.setup();

    // Create a delayed response to simulate the loading state
    server.use(
      http.post(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`, async () => {
        // Add a delay to see the loading state
        await new Promise((resolve) => setTimeout(resolve, 500));
        return HttpResponse.json(null, { status: 201 });
      }),
    );

    render(<AddScheduledTaskMenu />);

    // Click the menu button to open the menu
    const menuButton = screen.getByRole("button", { name: "Add Tasks" });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    // Get the routine button using the aria label
    const morningRoutineButton = screen.getByLabelText("Apply Morning routine");

    await user.click(morningRoutineButton);
    
    // Re-open the menu to see the loading state
    await user.click(menuButton);

    // Check that loading indicator appears
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Wait for the loading to complete
    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("shows loading indicator only for the clicked routine", async () => {
    const user = userEvent.setup();

    // Create a delayed response
    server.use(
      http.post(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`, async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return HttpResponse.json(null, { status: 201 });
      }),
    );

    render(<AddScheduledTaskMenu />);

    // Click the menu button to open the menu
    const menuButton = screen.getByRole("button", { name: "Add Tasks" });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });
    expect(screen.getByText("Workout")).toBeInTheDocument();

    const morningButton = screen.getByLabelText("Apply Morning routine");
    
    await user.click(morningButton);

    // Re-open the menu to see the loading state
    await user.click(menuButton);

    // Check that loading indicator appears
    const loadingIndicator = screen.getByRole("status");
    expect(loadingIndicator).toBeInTheDocument();

    // Check that we still see both routine names
    expect(screen.getByText("Morning")).toBeInTheDocument();
    expect(screen.getByText("Workout")).toBeInTheDocument();

    // Wait for the loading to complete
    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });

  it("clears loading state on error", async () => {
    const user = userEvent.setup();

    // Create an error response
    server.use(
      http.post(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`, async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json({ error: "Server error" }, { status: 500 });
      }),
    );

    render(<AddScheduledTaskMenu />);

    // Click the menu button to open the menu
    const menuButton = screen.getByRole("button", { name: "Add Tasks" });
    await user.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Morning")).toBeInTheDocument();
    });

    const morningButton = screen.getByLabelText("Apply Morning routine");
    
    await user.click(morningButton);

    // Re-open the menu to check loading state
    await user.click(menuButton);

    // Check that loading indicator appears
    expect(screen.getByRole("status")).toBeInTheDocument();

    // Wait for the error to occur and loading to clear
    await waitFor(
      () => {
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});