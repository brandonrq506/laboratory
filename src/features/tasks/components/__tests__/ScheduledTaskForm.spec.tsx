import { render, screen } from "@/test/test-utils";

import { ScheduledTaskForm } from "../ScheduledTaskForm";

import { scheduledTasks } from "@/test/store/tasks";

describe("ScheduledTaskForm", () => {
  it("does not focus notes when an existing note is present", () => {
    const taskWithNote = scheduledTasks.find(
      (t) => t.note && t.note.length > 0,
    )!;

    render(
      <ScheduledTaskForm
        task={taskWithNote}
        onSubmit={vi.fn()}
        initialValues={{ note: taskWithNote.note }}
      />,
    );

    const notes = screen.getByLabelText("Notes:");
    expect(notes).toBeInTheDocument();
    expect(notes).not.toHaveFocus();
  });

  it("auto-focuses notes when no note is present", async () => {
    const taskWithoutNote = scheduledTasks.find((t) => !t.note)!;

    render(
      <ScheduledTaskForm
        task={taskWithoutNote}
        onSubmit={vi.fn()}
        initialValues={{ note: taskWithoutNote.note }}
      />,
    );

    const notes = await screen.findByLabelText("Notes:");
    expect(notes).toBeInTheDocument();
    expect(notes).toHaveFocus();
  });

  it("sets the notes textarea to have 4 rows", () => {
    const task = scheduledTasks[0];

    render(
      <ScheduledTaskForm
        task={task}
        onSubmit={vi.fn()}
        initialValues={{ note: task.note }}
      />,
    );

    const notesTextArea = screen.getByLabelText("Notes:");
    expect(notesTextArea).toHaveAttribute("rows", "4");
  });
});
