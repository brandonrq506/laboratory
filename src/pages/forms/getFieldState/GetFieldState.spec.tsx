import { render, screen } from "@testing-library/react";
import { GetFieldState } from "./GetFieldState";
import userEvent from "@testing-library/user-event";

describe("GetFieldState", () => {
  it("displays when field is touched", async () => {
    const user = userEvent.setup();
    render(<GetFieldState />);

    await user.click(screen.getByLabelText("First Name"));
    await user.tab();
    await user.tab();
    await user.tab();

    expect(screen.getAllByText("Touched")).toHaveLength(3);
  });

  it("displays when field is dirty", async () => {
    const user = userEvent.setup();
    render(<GetFieldState />);

    await user.clear(screen.getByLabelText("First Name"));
    await user.clear(screen.getByLabelText("Last Name"));
    await user.clear(screen.getByLabelText("Age"));

    expect(screen.getAllByText("Dirty")).toHaveLength(3);
  });

  it("displays when field is invalid", async () => {
    const user = userEvent.setup();
    render(<GetFieldState />);

    await user.clear(screen.getByLabelText("First Name"));
    await user.type(screen.getByLabelText("First Name"), "Jo");
    await user.type(screen.getByLabelText("Last Name"), "Ramirez");
    await user.type(screen.getByLabelText("Age"), "17");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getAllByText("Invalid")).toHaveLength(3);
  });

  it("verifies last name can't be Doe", async () => {
    const user = userEvent.setup();
    render(<GetFieldState />);

    await user.dblClick(screen.getByRole("textbox", { name: "Last Name" }));
    await user.keyboard("{Delete}");

    await user.type(screen.getByLabelText("Last Name"), "Doe");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Last name cannot be Doe")).toBeInTheDocument();
  });
});
