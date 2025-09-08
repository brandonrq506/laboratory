import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteAllScheduledTasks } from "../DeleteAllScheduledTasks";

describe("DeleteAllScheduledTasks", () => {
  it("displays button to open dialog", () => {
    render(<DeleteAllScheduledTasks />);

    const btn_text = "Delete Scheduled Tasks";

    expect(screen.getByRole("button", { name: btn_text })).toBeInTheDocument();
  });

  it("is closed by default", () => {
    render(<DeleteAllScheduledTasks />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens dialog when button is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteAllScheduledTasks />);

    const btn_text = "Delete Scheduled Tasks";
    await user.click(screen.getByRole("button", { name: btn_text }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows the delete confirmation description", async () => {
    const user = userEvent.setup();
    render(<DeleteAllScheduledTasks />);

    const btn_text = "Delete Scheduled Tasks";
    await user.click(screen.getByRole("button", { name: btn_text }));

    expect(
      screen.getByText("Are you sure you want to delete all scheduled tasks?"),
    ).toBeInTheDocument();
  });
});
