import { render, screen } from "@testing-library/react";
import { Trigger } from "./Trigger";
import userEvent from "@testing-library/user-event";

describe("Trigger", () => {
  it("doesnt show error messages initially", () => {
    render(<Trigger />);

    const errors = screen.queryAllByRole("alert");
    expect(errors).toHaveLength(0);
  });

  it("shows error messages when form is submitted", async () => {
    const user = userEvent.setup();
    const expectedErros = 3;
    render(<Trigger />);

    const submitBtn = screen.getByRole("button", { name: "Submit" });
    await user.click(submitBtn);

    const errors = screen.getAllByRole("alert");
    expect(errors).toHaveLength(expectedErros);
  });

  it("should trigger first name error message", async () => {
    const user = userEvent.setup();
    render(<Trigger />);

    const btnText = "Trigger First Name";
    const triggerBtn = screen.getByRole("button", { name: btnText });
    await user.click(triggerBtn);

    const error = screen.getByText("First Name is too short");
    expect(error).toBeInTheDocument();
  });

  it("should trigger first & last name error messages", async () => {
    const user = userEvent.setup();
    const expectedErrors = 2;
    render(<Trigger />);

    const btnText = "Trigger First & Last name";
    const triggerBtn = screen.getByRole("button", { name: btnText });
    await user.click(triggerBtn);

    const errors = screen.getAllByRole("alert");
    expect(errors).toHaveLength(expectedErrors);
  });

  it("should trigger all error messages", async () => {
    const user = userEvent.setup();
    const expectedErrors = 3;
    render(<Trigger />);

    const btnText = "Trigger all";
    const triggerBtn = screen.getByRole("button", { name: btnText });
    await user.click(triggerBtn);

    const errors = screen.getAllByRole("alert");
    expect(errors).toHaveLength(expectedErrors);
  });

  it("should trigger first name with focus", async () => {
    const user = userEvent.setup();
    render(<Trigger />);

    const btnText = "Trigger First Name with Focus";
    const triggerBtn = screen.getByRole("button", { name: btnText });
    await user.click(triggerBtn);

    const error = screen.getByText("First Name is too short");
    const input = screen.getByLabelText("First Name");

    expect(error).toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it("should trigger first & last name with focus", async () => {
    const user = userEvent.setup();
    const expectedErrors = 2;
    render(<Trigger />);

    const btnText = "Trigger First & Last name with Focus";
    const triggerBtn = screen.getByRole("button", { name: btnText });
    await user.click(triggerBtn);

    const errors = screen.getAllByRole("alert");
    const inputs = screen.getAllByRole("textbox");

    expect(errors).toHaveLength(expectedErrors);
    expect(inputs[0]).toHaveFocus();
  });
});
