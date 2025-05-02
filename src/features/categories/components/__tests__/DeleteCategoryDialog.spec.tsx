import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteCategoryDialog } from "../DeleteCategoryDialog";

describe("DeleteCategoryDialog", () => {
  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const onClose = vi.fn();

    render(
      <DeleteCategoryDialog
        isOpen={true}
        onClose={onClose}
        onDelete={onDelete}
        categoryId={1}
      />,
    );

    const deleteBtn = screen.getByRole("button", { name: "Confirm" });
    await user.click(deleteBtn);

    expect(onDelete).toHaveBeenCalled();
  });
});
