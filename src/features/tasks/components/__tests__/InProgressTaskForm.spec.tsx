import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import type { InProgressFormType } from "../../types/inProgressFormType";
import { InProgressTaskForm } from "../InProgressTaskForm";

import { inProgressTasks } from "@/test/store/tasks";

describe("InProgressTaskForm", () => {
  const NOW = new Date(2026, 9, 19, 12, 0, 30);
  // Started today: the form places typed times on the date of the task's start.
  const task = {
    ...inProgressTasks[0],
    start_time: new Date(2026, 9, 19, 11, 0).toISOString(),
  };

  const initialValues = (start: Date): InProgressFormType => ({
    start_time: start.toISOString(),
    activity: { label: task.activity.display_name, value: task.activity.id },
    note: task.note,
  });

  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Catches: an In Progress Task being moved to start in the future.
  it("rejects a start time later than now and does not submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <InProgressTaskForm
        task={task}
        initialValues={initialValues(new Date(2026, 9, 19, 11, 0))}
        onSubmit={onSubmit}
      />,
    );

    const input = screen.getByLabelText("Start Time");
    await user.clear(input);
    await user.type(input, "12:30");
    await user.click(screen.getByRole("button", { name: "Update Task" }));

    expect(
      await screen.findByText("Start time must be in the past"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // Catches: EditInProgressTaskForm rounding branch breaking (it only rounds when start_time is not dirty).
  it("submits untouched with start_time not marked dirty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const values = initialValues(new Date(2026, 9, 19, 11, 0));
    render(
      <InProgressTaskForm
        task={task}
        initialValues={values}
        onSubmit={onSubmit}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Update Task" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const [data, dirtyFields] = onSubmit.mock.calls[0];
    expect(data).toEqual(values);
    expect(dirtyFields.start_time).toBeFalsy();
  });

  // Catches: dirty tracking missing a user edit, so the typed time would be rounded away.
  it("marks start_time dirty once the user changes it", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <InProgressTaskForm
        task={task}
        initialValues={initialValues(new Date(2026, 9, 19, 11, 0))}
        onSubmit={onSubmit}
      />,
    );

    const input = screen.getByLabelText("Start Time");
    await user.clear(input);
    await user.type(input, "11:30");
    await user.click(screen.getByRole("button", { name: "Update Task" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const [data, dirtyFields] = onSubmit.mock.calls[0];
    expect(data.start_time).toBe(new Date(2026, 9, 19, 11, 30).toISOString());
    expect(dirtyFields.start_time).toBe(true);
  });
});
