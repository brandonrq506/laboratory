import { render, screen, waitFor } from "@/test/test-utils";
import { createRoutesStub } from "react-router";

import { RoutineActivityList } from "../RoutineActivityList";

describe("RoutineActivityList", () => {
  it("displays loading status", () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/edit/1",
        Component: () => <RoutineActivityList />,
      },
    ]);

    render(<Stub initialEntries={["/routines/edit/1"]} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays empty list message", async () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/edit/:routineId",
        Component: () => <RoutineActivityList />,
      },
    ]);

    render(<Stub initialEntries={["/routines/edit/3"]} />);

    expect(await screen.findByText("No activities found")).toBeInTheDocument();
  });

  it("displays error message when not found", async () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/edit/:routineId",
        Component: () => <RoutineActivityList />,
      },
    ]);

    render(<Stub initialEntries={["/routines/edit/999"]} />);

    expect(
      await screen.findByText("Error loading routine activities"),
    ).toBeInTheDocument();
  });

  it("displays routine activities", async () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/edit/:routineId",
        Component: () => <RoutineActivityList />,
      },
    ]);

    render(<Stub initialEntries={["/routines/edit/2"]} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    expect(screen.getByText("PreWorkout")).toBeInTheDocument();
    expect(screen.getByText("Workout")).toBeInTheDocument();
  });
});
