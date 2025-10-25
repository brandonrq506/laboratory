import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteTask } from "../DeleteTask";

describe("DeleteTaskDialog", () => {
  it("opens delete dialog when button clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteTask taskId={1} />);

    await user.click(screen.getByRole("button", { name: "Delete Task" }));

    await screen.findByRole("dialog", { name: "Delete Task" });

    expect(
      screen.getByRole("dialog", { name: "Delete Task" }),
    ).toBeInTheDocument();
  });
});
