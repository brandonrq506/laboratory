import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProtectiveModal } from "./protective-modal";

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
  confirmValue: "my-category",
  title: "Delete Category",
  description: "This action cannot be undone.",
};

describe("ProtectiveModal", () => {
  it("confirm button disabled by default", async () => {
    render(<ProtectiveModal {...defaultProps} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
  });

  it("confirm button enabled on exact match", async () => {
    const user = userEvent.setup();

    render(<ProtectiveModal {...defaultProps} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.type(screen.getByRole("textbox"), "my-category");

    expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled();
  });

  it("calls onConfirm on confirm click after typing match", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<ProtectiveModal {...defaultProps} onConfirm={onConfirm} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.type(screen.getByRole("textbox"), "my-category");

    await user.click(screen.getByRole("button", { name: "Confirm" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Cancel click", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ProtectiveModal {...defaultProps} onClose={onClose} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<ProtectiveModal {...defaultProps} onClose={onClose} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("resets input on close", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(
      <ProtectiveModal {...defaultProps} onClose={onClose} />,
    );

    await screen.findByRole("dialog", { name: "Delete Category" });

    const input = screen.getByRole("textbox");

    await user.type(input, "my-category");

    expect(input).toHaveValue("my-category");

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<ProtectiveModal {...defaultProps} onClose={onClose} />);

    await screen.findByRole("dialog", { name: "Delete Category" });

    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
