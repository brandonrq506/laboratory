import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ConfirmationModal } from "./ConfirmationModal";

describe("ConfirmationModal", () => {
  it("renders the modal when isOpen is true", async () => {
    render(
      <ConfirmationModal
        isOpen={true}
        onClose={() => {}}
        icon="info"
        title="Title"
        description="Description"
        actions={<button>Close</button>}
      />,
    );

    await screen.findByRole("dialog", { name: "Title" });

    expect(await screen.findByText("Title")).toBeInTheDocument();
    expect(await screen.findByText("Description")).toBeInTheDocument();
    expect(await screen.findByText("Close")).toBeInTheDocument();
  });

  it("does not render the modal when isOpen is false", () => {
    render(
      <ConfirmationModal
        isOpen={false}
        onClose={() => {}}
        icon="info"
        title="Title"
        description="Description"
        actions={<button>Close</button>}
      />,
    );

    expect(screen.queryByText("Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Description")).not.toBeInTheDocument();
    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });

  it("calls onClose callback when the user presses 'Esc'", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        onClose={onClose}
        icon="info"
        title="Title"
        description="Description"
        actions={<button>Close</button>}
      />,
    );

    await screen.findByRole("dialog", { name: "Title" });

    await user.keyboard("{Escape}");

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
