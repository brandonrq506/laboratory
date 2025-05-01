import { render, screen, waitFor } from "@/test/test-utils";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

import { RoutineNameForm } from "./RoutineNameForm";
import { routines } from "@/test/store/routines";

describe("RoutineNameForm", () => {
  it("shows loading indicator", () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/:routineId",
        Component: () => <RoutineNameForm />,
      },
    ]);

    render(<Stub initialEntries={["/routines/1"]} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("displays routine name", async () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/:routineId",
        Component: () => <RoutineNameForm />,
      },
    ]);

    render(<Stub initialEntries={["/routines/1"]} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("Name *");

    expect(nameInput).toHaveValue(routines[0].name);
  });

  it("should load the correct routine from Props", async () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/",
        Component: () => <RoutineNameForm routineId={3} />,
      },
    ]);

    render(<Stub initialEntries={["/routines"]} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("Name *");

    expect(nameInput).toHaveValue(routines[2].name);
  });

  it("requires name to be present", async () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/:routineId",
        Component: () => <RoutineNameForm />,
      },
    ]);

    render(<Stub initialEntries={["/routines/1"]} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("Name *");

    await userEvent.clear(nameInput);

    const submitButton = screen.getByRole("button", { name: "Update" });

    await userEvent.click(submitButton);

    expect(screen.getByText("Name is required")).toBeInTheDocument();
  });

  it("submits when the form is valid", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/routines/:routineId",
        Component: () => <RoutineNameForm />,
      },
    ]);

    render(<Stub initialEntries={["/routines/1"]} />);

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText("Name *");

    await user.clear(nameInput);

    await user.type(nameInput, "New Routine Name");

    const submitButton = screen.getByRole("button", { name: "Update" });

    await user.click(submitButton);
  });
});
