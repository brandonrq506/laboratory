import { render, screen } from "@/test/test-utils";
import { ScheduledTask } from "../ScheduledTask";

import { scheduledTasks } from "@/test/store/tasks";

describe("ScheduledTask", () => {
  const task = scheduledTasks[0];

  it("renders the component with all proper elements", () => {
    render(
      <ScheduledTask task={{ ...task, expected_start_time: new Date() }} />,
    );

    expect(screen.getByText(task.activity.display_name)).toBeInTheDocument();
  });
});
