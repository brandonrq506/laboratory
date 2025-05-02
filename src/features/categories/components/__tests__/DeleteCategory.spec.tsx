import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { DeleteCategory } from "../DeleteCategory";
import { categories } from "@/test/store/categories";

describe("DeleteCategory", () => {
  const category = categories[0];

  it("shows delete icon button", () => {
    render(<DeleteCategory categoryId={category.id} />);

    const deleteBtn = screen.getByRole("button", { name: "Delete Category" });

    expect(deleteBtn).toBeInTheDocument();
  });

  it("shows delete category dialog when delete icon button is clicked", async () => {
    const user = userEvent.setup();
    render(<DeleteCategory categoryId={category.id} />);

    const deleteBtn = screen.getByRole("button", { name: "Delete Category" });

    await user.click(deleteBtn);

    const dialog = screen.getByRole("dialog", { name: "Delete Category" });

    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("shows the delete confirmation description", async () => {
    const user = userEvent.setup();
    render(<DeleteCategory categoryId={category.id} />);

    const confirmationMessage =
      "Are you sure you want to delete this category?";

    await user.click(screen.getByRole("button", { name: "Delete Category" }));

    expect(screen.getByText(confirmationMessage)).toBeInTheDocument();
  });
});
