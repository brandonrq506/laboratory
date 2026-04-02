import { render, screen } from "@/test/test-utils";
import { CompletedTask } from "../CompletedTask";

import { completedTasks } from "@/test/store/tasks";

vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@tanstack/react-router")>()),
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
});
