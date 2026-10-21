import { render, screen, waitFor } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import type { NewTaskForm as FormType } from "../../types/newTaskForm";
import { NewTaskForm } from "../NewTaskForm";

import { activities } from "@/test/store/activities";

import { TASK_STATUS } from "@/features/tasks/types/task-status";

describe("NewTaskForm", () => {
  const date = new Date(2026, 9, 19);
  const activity = activities[0];

  const initialValues: FormType = {
    activity: null,
    end_time: date.toISOString(),
    start_time: date.toISOString(),
    status: TASK_STATUS.COMPLETED,
    note: "",
  };

  const timeOn = (hours: number, minutes: number) =>
    new Date(2026, 9, 19, hours, minutes).toISOString();

  const setTime = async (
    user: ReturnType<typeof userEvent.setup>,
    label: string,
    hhmm: string,
  ) => {
    const input = screen.getByLabelText(label);
    await user.clear(input);
    await user.type(input, hhmm);
  };

  const pickActivity = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(
      screen.getByRole("combobox", { name: "Activities" }),
      activity.display_name,
    );
    await user.click(
      await screen.findByRole("option", { name: activity.display_name }),
    );
  };

  const renderForm = (onSubmit: () => void) => {
    render(
      <NewTaskForm
        date={date}
        initialValues={initialValues}
        onSubmit={onSubmit}
      />,
    );
  };

  // Catches: a Completed Task being created without an Activity (create form sends activity_id from it).
  it("asks for an activity and does not submit without one", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderForm(onSubmit);

    await setTime(user, "Start Time", "09:00");
    await setTime(user, "End Time", "10:00");
    await user.click(screen.getByRole("button", { name: "Create Task" }));

    expect(
      await screen.findByText("Please select an activity"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // Catches: a Completed Task with a negative duration reaching the API.
  it("rejects an end time that is not after the start time", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderForm(onSubmit);

    await pickActivity(user);
    await setTime(user, "Start Time", "10:00");
    await setTime(user, "End Time", "09:00");
    await user.click(screen.getByRole("button", { name: "Create Task" }));

    expect(
      await screen.findByText("End time must be after start time"),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  // Catches: times not landing on the given date, or option/note/status not reaching the consumer.
  it("submits the chosen activity, note and times on the given date", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    renderForm(onSubmit);

    await pickActivity(user);
    await user.type(screen.getByLabelText("Notes"), "Pairing session");
    await setTime(user, "Start Time", "09:00");
    await setTime(user, "End Time", "10:15");
    await user.click(screen.getByRole("button", { name: "Create Task" }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    expect(onSubmit).toHaveBeenCalledWith({
      activity: expect.objectContaining({
        label: activity.display_name,
        value: activity.id,
      }),
      end_time: timeOn(10, 15),
      note: "Pairing session",
      start_time: timeOn(9, 0),
      status: TASK_STATUS.COMPLETED,
    });
  });
});
