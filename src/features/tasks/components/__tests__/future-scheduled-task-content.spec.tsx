import { render, screen } from "@/test/test-utils";
import { FutureScheduledTaskContent } from "../future-scheduled-task-content";

import { scheduledTasks } from "@/test/store/tasks";

import type * as TanStackReactRouter from "@tanstack/react-router";
import type { ScheduledTaskAPI } from "../../types/scheduledTask";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  getRouteApi: () => ({ useSearch: () => ({ date: "2025-05-03" }) }),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

const buildTask = (note: string): ScheduledTaskAPI => ({
  ...scheduledTasks[0],
  note,
});

describe("FutureScheduledTaskContent", () => {
  it("shows the task note on its own note row", () => {
    const task = buildTask("Prepare the release notes");

    render(<FutureScheduledTaskContent task={task} />);

    expect(screen.getByRole("note")).toHaveTextContent(task.note);
  });

  it("does not show a note row when the task has no note", () => {
    render(<FutureScheduledTaskContent task={buildTask("")} />);

    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });
});
