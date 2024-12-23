import { render, screen } from "@testing-library/react";
import { DynamicPassword } from "./DynamicPassword";
import userEvent from "@testing-library/user-event";

describe("DynamicPassword", () => {
  it("requires a password", async () => {
    const passMessage = "Password is required";
    const confirmPassMessage = "Please confirm your password";

    const user = userEvent.setup();
    render(<DynamicPassword />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(passMessage)).toBeInTheDocument();
    expect(screen.getByText(confirmPassMessage)).toBeInTheDocument();
  });

  it("requires a matching password", async () => {
    const user = userEvent.setup();
    render(<DynamicPassword />);

    await user.type(screen.getByLabelText("Password"), "password");
    await user.type(screen.getByLabelText("Confirm Password"), "password1");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText("The passwords do not match")).toBeInTheDocument();
  });

  it("meets low security requirements", async () => {
    const lengthError = "Password must be at least 6 characters";
    const uppercaseError = "Password must contain uppercase and lowercase";

    const user = userEvent.setup();
    render(<DynamicPassword />);

    await user.selectOptions(screen.getByRole("listbox"), "Low");
    await user.type(screen.getByLabelText("Password"), "12345");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(lengthError)).toBeInTheDocument();

    await user.type(screen.getByLabelText("Password"), "brandon");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(uppercaseError)).toBeInTheDocument();
  });

  it("meets high security requirements", async () => {
    const lenghtError = "Password must be at least 12 characters";
    const highReqError =
      "Password must contain uppercase, lowercase, one number, and one special character";

    const user = userEvent.setup();
    render(<DynamicPassword />);

    await user.selectOptions(screen.getByRole("listbox"), "High");
    await user.type(screen.getByLabelText("Password"), "Brandon123");
    await user.type(screen.getByLabelText("Confirm Password"), "Brandon123");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(lenghtError)).toBeInTheDocument();

    await user.type(screen.getByLabelText("Password"), "BrandonRam123irez");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(highReqError)).toBeInTheDocument();
  });
});
