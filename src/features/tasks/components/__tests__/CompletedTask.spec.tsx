import { render, screen } from "@/test/test-utils";
import { CompletedTask } from "../CompletedTask";

import { completedTasks } from "@/test/store/tasks";

import type * as TanStackReactRouter from "@tanstack/react-router";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof TanStackReactRouter>()),
  Link: (props: React.ComponentProps<"a">) => <a {...props} />,
}));

describe("CompletedTask", () => {
  it("renders the component", () => {
    const task = completedTasks[0];
    render(
      <CompletedTask
        task={task}
        linkProps={{ to: "/timer/$taskId/edit", params: { taskId: task.id } }}
      />,
    );

    expect(screen.getByRole("button", { name: "Delete Task" }));
    expect(screen.getByText(task.activity.display_name)).toBeInTheDocument();
  });

  it("shows the task note on its own note row", () => {
    const task = completedTasks[1];

    render(
      <CompletedTask
        task={task}
        linkProps={{ to: "/timer/$taskId/edit", params: { taskId: task.id } }}
      />,
    );

    expect(screen.getByRole("note")).toHaveTextContent(task.note);
  });

  it("does not show a note row when the task has no note", () => {
    const task = completedTasks[0];

    render(
      <CompletedTask
        task={task}
        linkProps={{ to: "/timer/$taskId/edit", params: { taskId: task.id } }}
      />,
    );

    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });
});
