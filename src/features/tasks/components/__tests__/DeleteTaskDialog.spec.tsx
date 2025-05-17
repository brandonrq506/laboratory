import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteTaskDialog } from "../DeleteTaskDialog";

describe("DeleteTaskDialog", () => {
  it("calls on close when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<DeleteTaskDialog isOpen={true} onClose={onClose} taskId={3407} />);

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(onClose).toHaveBeenCalled();
  });

  it("calls on close when delete task button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<DeleteTaskDialog isOpen={true} onClose={onClose} taskId={3407} />);

    const deleteBtn = screen.getByRole("button", { name: "Confirm" });
    await user.click(deleteBtn);

    expect(onClose).toHaveBeenCalled();
  });
});
