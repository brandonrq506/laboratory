import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";

import { TaskStatusSelectFilter } from "./TaskStatusSelectFilter";
import userEvent from "@testing-library/user-event";

describe("TaskStatusSelectFilter", () => {
  it("renders with 'All' by default", () => {
    const Stub = createRoutesStub([
      {
        path: "/tasks",
        Component: TaskStatusSelectFilter,
      },
    ]);

    render(<Stub initialEntries={["/tasks"]} />);

    expect(screen.getByText("All")).toBeInTheDocument();
  });

  it("renders with 'Scheduled' option selected", () => {
    const Stub = createRoutesStub([
      {
        path: "/tasks",
        Component: TaskStatusSelectFilter,
      },
    ]);

    render(<Stub initialEntries={["/tasks?status=scheduled"]} />);

    expect(screen.getByText("Scheduled")).toBeInTheDocument();
  });

  it('switches to "In Progress" option', async () => {
    const user = userEvent.setup();

    const Stub = createRoutesStub([
      {
        path: "/tasks",
        Component: TaskStatusSelectFilter,
      },
    ]);

    render(<Stub initialEntries={["/tasks"]} />);

    const input = screen.getByRole("button", { name: /Status/i });

    await user.click(input);

    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    const button = screen.getByRole("button", { name: /Status/i });
    expect(button).toHaveTextContent("In Progress");
  });

  it("Shows 'Missing Default' when invalid searchParam", () => {
    const Stub = createRoutesStub([
      {
        path: "/tasks",
        Component: TaskStatusSelectFilter,
      },
    ]);

    render(<Stub initialEntries={["/tasks?status=invalid"]} />);

    const button = screen.getByRole("button", { name: /Status/i });
    expect(button).toHaveTextContent("Missing Default");
  });
});
