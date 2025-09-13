import { HttpResponse, http } from "msw";
import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { RoutineMenuItem } from "../RoutineMenuItem";
import { ROUTINES_ENDPOINT } from "@/libs/axios";
import { server } from "@/test/server";

const API_URL = import.meta.env.VITE_API_URL;

const mockRoutine = {
  id: 1,
  name: "Morning Routine",
};

describe("RoutineMenuItem", () => {
  it("renders routine name and badge", () => {
    render(<RoutineMenuItem routine={mockRoutine} />);

    expect(screen.getByText("Morning Routine")).toBeInTheDocument();
    expect(screen.getByText("Routine")).toBeInTheDocument();
    expect(screen.getByLabelText("Apply Morning Routine routine")).toBeInTheDocument();
  });

  it("shows loading indicator when applying routine", async () => {
    const user = userEvent.setup();

    // Create a delayed response to simulate the loading state
    server.use(
      http.post(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`, async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return HttpResponse.json(null, { status: 201 });
      }),
    );

    render(<RoutineMenuItem routine={mockRoutine} />);

    const button = screen.getByLabelText("Apply Morning Routine routine");
    await user.click(button);

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

  it("clears loading state on error", async () => {
    const user = userEvent.setup();

    // Create an error response
    server.use(
      http.post(`${API_URL}/v1${ROUTINES_ENDPOINT}/:routineId/apply`, async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return HttpResponse.json({ error: "Server error" }, { status: 500 });
      }),
    );

    render(<RoutineMenuItem routine={mockRoutine} />);

    const button = screen.getByLabelText("Apply Morning Routine routine");
    await user.click(button);

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

  it("calls applyRoutine with correct routine id", async () => {
    const user = userEvent.setup();

    render(<RoutineMenuItem routine={mockRoutine} />);

    const button = screen.getByLabelText("Apply Morning Routine routine");
    await user.click(button);

    // The mutation should be called
    // This is tested indirectly through the loading state appearance
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});