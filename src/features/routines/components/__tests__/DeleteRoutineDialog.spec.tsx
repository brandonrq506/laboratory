import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteRoutineDialog } from "../DeleteRoutineDialog";

describe("DeleteRoutineDialog", () => {
  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <DeleteRoutineDialog isOpen={true} onClose={onClose} routineId={1} />,
    );

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <DeleteRoutineDialog isOpen={true} onClose={onClose} routineId={1} />,
    );

    const deleteBtn = screen.getByRole("button", { name: "Confirm" });
    await user.click(deleteBtn);

    expect(onClose).toHaveBeenCalled();
  });
});
