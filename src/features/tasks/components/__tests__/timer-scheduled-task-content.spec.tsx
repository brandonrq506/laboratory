import { render, screen } from "@/test/test-utils";
import { TimerScheduledTaskContent } from "../timer-scheduled-task-content";

import { scheduledTasks } from "@/test/store/tasks";

import type * as TanStackReactRouter from "@tanstack/react-router";
import type { ScheduledTaskWithEST } from "../../types/scheduledTaskWithEST";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

const buildTask = (note: string): ScheduledTaskWithEST => ({
  ...scheduledTasks[0],
  expected_start_time: new Date(scheduledTasks[0].scheduled_at),
  note,
});

describe("TimerScheduledTaskContent", () => {
  it("shows the task note on its own note row", () => {
    const task = buildTask("Prepare the release notes");

    render(<TimerScheduledTaskContent task={task} />);

    expect(screen.getByRole("note")).toHaveTextContent(task.note);
  });

  it("does not show a note row when the task has no note", () => {
    render(<TimerScheduledTaskContent task={buildTask("")} />);

    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });
});
