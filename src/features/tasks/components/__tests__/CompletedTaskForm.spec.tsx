import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { CompletedTaskForm } from "../CompletedTaskForm";

import { completedTasks } from "@/test/store/tasks";

describe("CompletedTaskForm", () => {
  it('renders both "Start Time" and "End Time" inputs when', () => {
    const task = completedTasks[0];

    render(
      <CompletedTaskForm
        task={task}
        onSubmit={vi.fn()}
        initialValues={{
          start_time: task.start_time,
          end_time: task.end_time,
          activity: { label: task.activity.name, value: task.activity.id },
        }}
      />,
    );

    expect(screen.getByLabelText("Start Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Time")).toBeInTheDocument();
  });

  it("displays the correct button text", () => {
    const task = completedTasks[0];

    render(
      <CompletedTaskForm
        task={task}
        onSubmit={vi.fn()}
        initialValues={{
          end_time: task.end_time,
          start_time: task.start_time,
          activity: { label: task.activity.name, value: task.activity.id },
        }}
      />,
    );
    expect(
      screen.getByRole("button", { name: "Update Task" }),
    ).toBeInTheDocument();
  });

  it("shows error message when end time is before start time", async () => {
    const user = userEvent.setup();
    const task = completedTasks[0];

    const now = new Date().toISOString().substring(0, 16);
    const pastTime = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    render(
      <CompletedTaskForm
        task={task}
        onSubmit={vi.fn()}
        initialValues={{
          start_time: now,
          end_time: pastTime,
          activity: { label: task.activity.name, value: task.activity.id },
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Update Task" }));

    expect(
      await screen.findByText("End time must be after start time"),
    ).toBeInTheDocument();
  });
});
