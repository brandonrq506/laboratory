import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { MODAL_DURATION } from "@/constants/durations";
import { ProtectiveModal } from "./protective-modal";

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  onConfirm: vi.fn(),
  confirmValue: "my-category",
  title: "Delete Category",
  description: "This action cannot be undone.",
};

const renderProtectiveModal = async (
  props: React.ComponentProps<typeof ProtectiveModal> = defaultProps,
) => {
  const utils = render(<ProtectiveModal {...props} />);

  await act(() => vi.advanceTimersByTimeAsync(MODAL_DURATION));
  vi.useRealTimers();

  return { ...utils, user: userEvent.setup() };
};

describe("ProtectiveModal", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("confirm button disabled by default", async () => {
    await renderProtectiveModal();

    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled();
  });

  it("confirm button enabled on exact match", async () => {
    const { user } = await renderProtectiveModal();

    await user.type(screen.getByRole("textbox"), "my-category");

    expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled();
  });

  it("calls onConfirm on confirm click after typing match", async () => {
    const onConfirm = vi.fn();
    const { user } = await renderProtectiveModal({
      ...defaultProps,
      onConfirm,
    });

    await user.type(screen.getByRole("textbox"), "my-category");

    await user.click(screen.getByRole("button", { name: "Confirm" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Cancel click", async () => {
    const onClose = vi.fn();
    const { user } = await renderProtectiveModal({ ...defaultProps, onClose });

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape", async () => {
    const onClose = vi.fn();
    const { user } = await renderProtectiveModal({ ...defaultProps, onClose });

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("resets input on close", async () => {
    const onClose = vi.fn();
    const { rerender, user } = await renderProtectiveModal({
      ...defaultProps,
      onClose,
    });

    const input = screen.getByRole("textbox");

    await user.type(input, "my-category");

    expect(input).toHaveValue("my-category");

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<ProtectiveModal {...defaultProps} onClose={onClose} />);

    expect(screen.getByRole("textbox")).toHaveValue("");
  });
});
