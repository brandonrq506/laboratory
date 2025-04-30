import { render, screen } from "@/test/test-utils";
import { activities } from "@/test/store/activities";
import userEvent from "@testing-library/user-event";

import { DeleteActivityDialog } from "./DeleteActivityDialog";

describe("DeleteActivityDialog", () => {
  const activity = activities[0];

  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <DeleteActivityDialog
        isOpen={true}
        onClose={onClose}
        activity={activity}
      />,
    );

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <DeleteActivityDialog
        isOpen={true}
        onClose={onClose}
        activity={activity}
      />,
    );

    const deleteBtn = screen.getByRole("button", { name: "Confirm" });
    await user.click(deleteBtn);

    expect(onClose).toHaveBeenCalled();
  });
});
