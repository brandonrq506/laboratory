import { render, screen } from "@testing-library/react";
import { LastName } from "./LastName";
import userEvent from "@testing-library/user-event";

describe("LastName", () => {
  it("displays with default values", () => {
    render(<LastName />);
    expect(screen.getByLabelText("First Name")).toHaveValue("Brandon");
    expect(screen.getByLabelText("Last Name")).toHaveValue("Ramirez");
    expect(screen.getByLabelText("Has Last Name")).toBeChecked();
  });

  it('displays without "Last Name" when unchecked', async () => {
    const user = userEvent.setup();
    render(<LastName />);

    await user.click(screen.getByLabelText("Has Last Name"));

    expect(screen.queryByLabelText("Last Name")).not.toBeInTheDocument();
  });

  it('focuses last name when "Has Last Name" is checked', async () => {
    const user = userEvent.setup();
    render(<LastName />);

    await user.click(screen.getByLabelText("Has Last Name"));
    await user.click(screen.getByLabelText("Has Last Name"));

    expect(screen.getByLabelText("Last Name")).toHaveFocus();
  });

  it("requires first and last name", async () => {
    const user = userEvent.setup();
    render(<LastName />);

    await user.clear(screen.getByLabelText("First Name"));
    await user.clear(screen.getByLabelText("Last Name"));

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("First name is required.")).toBeInTheDocument();
    expect(
      screen.getByText("If you have a last name, you must provide it."),
    ).toBeInTheDocument();
  });

  it("does not allow numbers in last name", async () => {
    const user = userEvent.setup();
    render(<LastName />);

    await user.clear(screen.getByLabelText("Last Name"));
    await user.type(screen.getByLabelText("Last Name"), "123");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByText("Last name cannot contain numbers."),
    ).toBeInTheDocument();
  });

  it("does not allow sequential spaces in last name", async () => {
    const user = userEvent.setup();
    render(<LastName />);

    await user.clear(screen.getByLabelText("Last Name"));
    await user.type(screen.getByLabelText("Last Name"), "  ");

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      screen.getByText("Last name cannot contain sequential spaces."),
    ).toBeInTheDocument();
  });
});
