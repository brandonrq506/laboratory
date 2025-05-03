import { render, screen } from "@/test/test-utils";
import { createRoutesStub } from "react-router";
import userEvent from "@testing-library/user-event";

import { EditTaskForm } from "../EditTaskForm";

import { completedTasks } from "@/test/store/tasks";

describe("EditTaskForm", () => {
  it("renders the component with initial values", () => {
    const task = completedTasks[0];

    const Stub = createRoutesStub([
      {
        path: "/timer/edit/:taskId",
        Component: () => <EditTaskForm task={task} />,
      },
    ]);

    render(<Stub initialEntries={[`/timer/edit/${task.id}`]} />);

    expect(screen.getByLabelText("Activities")).toHaveValue(task.activity.name);
  });

  it("navigates to the timer page after submitting the form", async () => {
    const user = userEvent.setup();
    const task = completedTasks[0];

    const Stub = createRoutesStub([
      {
        path: "/timer/edit/:taskId",
        Component: () => <EditTaskForm task={task} />,
      },
      {
        path: "/timer",
        Component: () => <div>Timer Page</div>,
      },
    ]);

    render(<Stub initialEntries={["/timer", `/timer/edit/${task.id}`]} />);

    await user.click(screen.getByRole("button", { name: "Update Task" }));

    expect(screen.getByText("Timer Page")).toBeInTheDocument();
  });
});
