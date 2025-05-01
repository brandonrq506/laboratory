import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RoutineForm } from "./RoutineForm";

describe("RoutineForm", () => {
  it("renders the form with initial values", () => {
    const initialValues = { name: "Morning Routine" };
    render(
      <RoutineForm
        initialValues={initialValues}
        onSubmit={vi.fn()}
        submitButtonText="Save"
      />,
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue(initialValues.name);
  });

  it("calls onSubmit with the form data when submitted", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<RoutineForm onSubmit={onSubmit} submitButtonText="Save" />);

    const nameInput = screen.getByLabelText(/name/i);

    await user.type(nameInput, "Evening Routine");

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ name: "Evening Routine" });
  });

  it("shows validation errors when the form is submitted with invalid data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<RoutineForm onSubmit={onSubmit} submitButtonText="Save" />);

    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
