import { render, screen } from "@/test/test-utils";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

import { CreateRoutineForm } from "../CreateRoutineForm";

describe("CreateRoutineForm", () => {
  it("renders button with correct text", () => {
    const Stub = createRoutesStub([
      {
        path: "/routines/new",
        Component: () => <CreateRoutineForm />,
      },
    ]);

    render(<Stub initialEntries={["/routines/new"]} />);

    const button = screen.getByRole("button", { name: "Add Routine" });

    expect(button).toBeInTheDocument();
  });

  it("navigates to the Routine edit page on submit", async () => {
    const user = userEvent.setup();
    const Stub = createRoutesStub([
      {
        path: "/routines/new",
        Component: () => <CreateRoutineForm />,
      },
      {
        path: "/routines/edit/:routineId",
        Component: () => <div>Routines Edit Page</div>,
      },
    ]);

    render(<Stub initialEntries={["/routines/new"]} />);

    await user.type(screen.getByLabelText(/name/i), "Test Routine");

    const button = screen.getByRole("button", { name: "Add Routine" });

    await user.click(button);

    expect(screen.getByText("Routines Edit Page")).toBeInTheDocument();
  });
});
