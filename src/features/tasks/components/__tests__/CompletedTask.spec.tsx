import { render, screen } from "@/test/test-utils";
import { CompletedTask } from "../CompletedTask";

import { completedTasks } from "@/test/store/tasks";

describe("CompletedTask", () => {
  it("renders the component", () => {
    const task = completedTasks[0];
    render(<CompletedTask task={task} />);

    expect(screen.getByRole("button", { name: "Delete Task" }));
    expect(screen.getByText(task.activity.name)).toBeInTheDocument();
  });
});
