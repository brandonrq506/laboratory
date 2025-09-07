import { render, screen } from "@/test/test-utils";
import userEvent from "@testing-library/user-event";

import { Toggle } from "../Toggle";

describe("Toggle", () => {
  it("renders label and description", () => {
    render(
      <Toggle
        label="Email notifications"
        description="Receive updates by email"
        checked={false}
        onChange={() => {}}
      />,
    );

    expect(screen.getByText("Email notifications")).toBeInTheDocument();
    expect(screen.getByText("Receive updates by email")).toBeInTheDocument();
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("calls onChange with the toggled value when clicked (off -> on)", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Toggle
        label="Email notifications"
        description="Receive updates by email"
        checked={false}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange with the toggled value when clicked (on -> off)", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <Toggle
        label="Email notifications"
        description="Receive updates by email"
        checked={true}
        onChange={handleChange}
      />,
    );

    await user.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(false);
  });
});
