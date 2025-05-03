import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { TaskForm } from "../TaskForm";

import { completedTasks, inProgressTasks } from "@/test/store/tasks";

describe("TaskForm", () => {
  // In Progress Tasks
  it('renders only the “Start Time” input when task.status is "in_progress"', () => {
    const task = inProgressTasks[0];

    render(
      <TaskForm
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
    expect(screen.queryByLabelText("End Time")).not.toBeInTheDocument();
  });

  it("shows a validation error when Start Time is set in the future for in-progress tasks", async () => {
    const user = userEvent.setup();
    const task = inProgressTasks[0];

    const futureTime = new Date(Date.now() + 60 * 60 * 1000)
      .toISOString()
      .substring(0, 16);

    render(
      <TaskForm
        task={task}
        onSubmit={vi.fn()}
        initialValues={{
          start_time: futureTime,
          end_time: task.end_time,
          activity: { label: task.activity.name, value: task.activity.id },
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Update Task" }));

    const errorMessage = "Time set to the future";

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  // Completed Tasks
  it('renders both "Start Time" and "End Time" inputs when task.status is "completed"', () => {
    const task = completedTasks[0];

    render(
      <TaskForm
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

  it("shows required-field errors if Start Time or End Time are empty on completed tasks", async () => {
    const user = userEvent.setup();
    const task = completedTasks[0];

    render(
      <TaskForm
        task={task}
        onSubmit={vi.fn()}
        initialValues={{
          start_time: task.start_time,
          end_time: null,
          activity: { label: task.activity.name, value: task.activity.id },
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Update Task" }));

    const errorMessage = "End time is required.";

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  // Common Tests
  it("displays the correct button text", () => {
    const task = completedTasks[0];

    render(
      <TaskForm
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

  it("calls onSubmit with the form values when the form is submitted", async () => {
    const user = userEvent.setup();
    const task = inProgressTasks[0];
    const onSubmit = vi.fn();

    render(
      <TaskForm
        task={task}
        onSubmit={onSubmit}
        initialValues={{
          start_time: task.start_time,
          end_time: task.end_time,
          activity: { label: task.activity.name, value: task.activity.id },
        }}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Update Task" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      start_time: task.start_time,
      end_time: task.end_time,
      activity: { label: task.activity.name, value: task.activity.id },
    });
  });
});
