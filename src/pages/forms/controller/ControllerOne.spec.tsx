import { render, screen } from "@testing-library/react";
import { ControllerOne } from "./ControllerOne";
import userEvent from "@testing-library/user-event";

describe("ControllerOne", () => {
  it('focuses on the input when the "Focus" button is clicked', async () => {
    const user = userEvent.setup();
    render(<ControllerOne />);

    await user.click(screen.getByRole("button", { name: "Focus" }));

    expect(screen.getByRole("combobox")).toHaveFocus();
  });

  it('resets the input when the "Reset" button is clicked', async () => {
    const user = userEvent.setup();
    render(<ControllerOne />);

    await user.click(screen.getByRole("button", { name: "ComboBox button" }));
    await user.click(screen.getByRole("option", { name: "Sushi" }));

    expect(screen.getByRole("combobox")).toHaveValue("Sushi");

    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByRole("combobox")).toHaveValue("");
  });
});
