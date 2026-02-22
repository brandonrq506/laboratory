import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProtectedConfirmationModal } from "./ProtectedConfirmationModal";

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
  confirmValue: "my-category",
  title: "Delete Category",
  description: "This action cannot be undone.",
};

describe("ProtectedConfirmationModal", () => {
  it("confirm button disabled by default", async () => {
    render(<ProtectedConfirmationModal {...defaultProps} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
  });

  it("confirm button enabled on exact match", async () => {
    const user = userEvent.setup();

    render(<ProtectedConfirmationModal {...defaultProps} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.type(screen.getByRole("textbox"), "my-category");

    expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled();
  });

  it("calls onConfirm on confirm click after typing match", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(
      <ProtectedConfirmationModal {...defaultProps} onConfirm={onConfirm} />,
    );

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.type(screen.getByRole("textbox"), "my-category");

    await user.click(screen.getByRole("button", { name: "Confirm" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Cancel click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ProtectedConfirmationModal {...defaultProps} onClose={onClose} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    
    render(<ProtectedConfirmationModal {...defaultProps} onClose={onClose} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
